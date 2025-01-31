import clsx from "clsx";
import { ConversationEditButtonProps } from "./Types";
import { Button } from "react-bootstrap";
import DefaultPencilIcon from "src/components/icons/PencilIcon";
import { useNavigate } from "react-router";
import useAppSearchParamState from "src/SearchParams";

export default function ConversationEditTitleButtonBase({
    className, onClick,
    PencilIcon=DefaultPencilIcon,
    id,
    ...props
}: ConversationEditButtonProps["functional"]) {
    const navigate = useNavigate();
    const { setConvo } = useAppSearchParamState();

    return (
        <Button
            className={clsx("conversation-title-edit-button", className)}
            onClick={(e) => {
                navigate("/conversation-settings");
                setConvo(id);
                onClick?.(e);
            }}
            {...props}
        >
            <PencilIcon />
        </Button>
    );
}