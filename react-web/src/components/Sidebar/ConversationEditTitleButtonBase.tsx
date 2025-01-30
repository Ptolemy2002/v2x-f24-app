import clsx from "clsx";
import { ConversationEditTitleButtonProps } from "./Types";
import { Button } from "react-bootstrap";
import DefaultPencilIcon from "src/components/icons/PencilIcon";

export default function ConversationEditTitleButtonBase({
    id, className, onClick,
    PencilIcon=DefaultPencilIcon,
    ...props
}: ConversationEditTitleButtonProps["functional"]) {
    return (
        <Button
            className={clsx("conversation-title-edit-button", className)}
            onClick={onClick}
            {...props}
        >
            <PencilIcon />
        </Button>
    );
}