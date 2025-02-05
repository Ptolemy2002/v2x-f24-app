import { Button } from "react-bootstrap";
import { ConversationSettingsSaveButtonProps } from "./Types";

export default function ConversationSettingsSaveButtonBase(props: ConversationSettingsSaveButtonProps["functional"]) {
    return (
        <Button
            {...props}
        >
            Save
        </Button>
    );
}