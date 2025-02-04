import clsx from "clsx";
import { ConversationEditButtonProps } from "./Types";
import { Button } from "react-bootstrap";
import DefaultPencilIcon from "src/components/icons/PencilIcon";
import { useNavigate } from "react-router";

export default function ConversationEditTitleButtonBase({
    className, onClick,
    PencilIcon=DefaultPencilIcon,
    id,
    ...props
}: ConversationEditButtonProps["functional"]) {
    const navigate = useNavigate();

    return (
        <Button
            className={clsx("conversation-title-edit-button", className)}
            onClick={(e) => {
                navigate("/conversation-settings?convo=" + id);
                onClick?.(e);
            }}
            {...props}
        >
            <PencilIcon />
        </Button>
    );
}