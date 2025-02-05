import { SuspenseBoundary, useSuspenseController } from "@ptolemy2002/react-suspense";
import { ConversationSettingsFormInputs, ConversationSettingsPageBodyProps } from "./Types";
import clsx from "clsx";
import { Form } from "react-bootstrap";
import ConversationData from "src/data/ConversationData";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import useManualErrorHandling from "@ptolemy2002/react-manual-error-handling";
import ConversationInfo from "src/context/ConversationInfo";
import DefaultSaveButton from "./SaveButtonStyled";

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
        handleSubmit
    } = useForm<ConversationSettingsFormInputs>();

    const onSubmit = useCallback(async (inputs: ConversationSettingsFormInputs) => {
        conversation.name = inputs.name;

        await _try(
            () => suspend(
                async () => {
                    await conversation.push()
                    // Update the name in the conversation entries list
                    conversationInfo.updateEntry(conversation.id, () => ({name: conversation.name}));
                }
            )
        );
    }, [conversation, conversationInfo, suspend, _try]);

    return (
        <Form
            className={clsx("col", className)}
            onSubmit={(e) => {
                handleSubmit(onSubmit)(e);
                _onSubmit?.(e);
            }}
            {...props}
        >
            <Form.Group className="form-group">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    {...formRegister("name")}
                    type="text"
                    defaultValue={
                        // Only apply default value after the conversation has been loaded
                        conversation.hasLastRequest() ? conversation.name : undefined
                    }
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