import { SuspenseBoundary, useSuspenseController } from "@ptolemy2002/react-suspense";
import { ConversationSettingsFormInputs, ConversationSettingsPageBodyProps } from "./Types";
import clsx from "clsx";
import { Button, Form } from "react-bootstrap";
import ConversationData from "src/data/ConversationData";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import useManualErrorHandling from "@ptolemy2002/react-manual-error-handling";

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
    { className, onSubmit: _onSubmit, ...props }: ConversationSettingsPageBodyProps["functional"]
) {
    const [conversation] = ConversationData.useContextNonNullable(["name"]);
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
                () => conversation.push(),
            )
        );
    }, [conversation]);

    return (
        <Form
            className={clsx("col", className)}
            onSubmit={(e) => {
                handleSubmit(onSubmit)(e);
                _onSubmit?.(e);
            }}
            {...props}
        >
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

            <Button type="submit">Save</Button>
        </Form>
    );
}