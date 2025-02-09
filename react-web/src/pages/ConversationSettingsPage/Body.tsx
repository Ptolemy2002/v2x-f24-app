import { SuspenseBoundary, useSuspenseController } from "@ptolemy2002/react-suspense";
import { ConversationSettingsFormInputs, ConversationSettingsPageBodyProps } from "./Types";
import clsx from "clsx";
import { Form } from "react-bootstrap";
import ConversationData from "src/data/ConversationData";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import useManualErrorHandling from "@ptolemy2002/react-manual-error-handling";
import ConversationInfo from "src/context/ConversationInfo";
import DefaultSaveButton from "./SaveButtonStyled";
import { AxiosError } from "axios";
import { ConversationUpdateByIDResponseBody } from "shared";
import ErrorAlert from "src/components/alerts/ErrorAlert";
import SuccessAlert from "src/components/alerts/SuccessAlert";

export default function ConversationSettingsPageBodyBase(props: ConversationSettingsPageBodyProps["functional"]) {
    const [conversation] = ConversationData.useContextNonNullable([]);

    return (
        <SuspenseBoundary fallback={<p>Loading...</p>} init={async () => {
            await conversation.pull(conversation.id);
        }}>
            <InternalForm {...props} />
        </SuspenseBoundary>
    )
}

function InternalForm(
    {
        className,
        onSubmit: _onSubmit,
        SaveButton = DefaultSaveButton,
        ...props
    }: ConversationSettingsPageBodyProps["functional"]
) {
    const [conversation] = ConversationData.useContextNonNullable(["name", "createdAt"]);
    const [conversationInfo] = ConversationInfo.useContext();
    const { _try } = useManualErrorHandling<void | null>();
    const [{ suspend }] = useSuspenseController([]);

    const {
        register: formRegister,
        handleSubmit,
        setError,
        setValue,
        formState: { isSubmitSuccessful, submitCount, errors}
    } = useForm<ConversationSettingsFormInputs>();

    const onSubmit = useCallback(async (inputs: ConversationSettingsFormInputs) => {
        // If no edits were made, ther default value is used, which is an empty string, or falsy.
        conversation.name = inputs.name;

        if (!conversation.isDirty(["push", "pull", "queryBot"])) {
            setError("root", {
                message: "No changes detected"
            });
            return;
        }

        await _try(
            () => suspend(
                async () => {
                    await conversation.push()
                    // Update the name in the conversation entries list
                    conversationInfo.updateEntry(conversation.id, () => ({name: conversation.name}));
                }
            ).catch((e: AxiosError<ConversationUpdateByIDResponseBody>) => {
                if (e.status === 409) {
                    // These checks should theoretically never pass,
                    // but we'll be safe.
                    if (!e.response || e.response.data.ok) throw e;

                    let message = e.response.data.message ?? "Unknown cause";
                    if (Array.isArray(message)) {
                        message = message.join("\n");
                    }

                    setError("root", {
                        message
                    });

                    // Prevent the error from being thrown
                    return;
                }

                throw e;
            })
        );
    }, [conversation, conversationInfo, suspend, _try]);

    // When the name changes through external means, like a fetch, update the form to match.
    useEffect(() => {
        setValue("name", conversation.name);
    }, [conversation.name, setValue]);

    return (
        <Form
            className={clsx("col", className)}
            onSubmit={(e) => {
                handleSubmit(onSubmit)(e);
                _onSubmit?.(e);
            }}
            {...props}
        >
            {
                errors.root && 
                    <ErrorAlert key={submitCount} dismissible>
                        {{
                            head: "Submission Error",
                            body: errors.root.message
                        }}
                    </ErrorAlert>
            }

            {
                isSubmitSuccessful &&
                    <SuccessAlert key={submitCount} dismissible>
                        {{
                            head: "Success",
                            body: "Conversation updated successfully"
                        }}
                    </SuccessAlert>
            }

            <Form.Group className="form-group">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    {...formRegister("name")}
                    type="text"
                    placeholder="Enter name"
                />
            </Form.Group>

            <p>
                Created at: {conversation.createdAt.toLocaleString()} <br />
                Last Activity: {conversation.getLastModified().toLocaleString()}
            </p>

            <SaveButton type="submit" />
        </Form>
    );
}