import useAppSearchParamState from "src/SearchParams";
import {ChatLinkProps} from "./Types";
import clsx from "clsx";
import { useNavigate } from "react-router";
import DefaultConversationEditTitleButton from "./ConversationEditTitleButtonStyled";

export default function ChatLinkBase({
    text, id, name, className, onClick,
    ConversationEditTitleButton=DefaultConversationEditTitleButton,
    ...props
}: ChatLinkProps["functional"]) {
    const {convo, setConvo} = useAppSearchParamState();
    const navigate = useNavigate();

    return (
        // clsx is just a utility that lets us combine class names. Falsy values do not get added to the class list,
        // which is why "active" is only added when the active prop is true.
        <li className={clsx("chat-link", convo === id && "active", className)} {...props}>
            <a onClick={(e) => {
                navigate("/");
                setConvo(id);
                onClick?.(e);
            }}>{text}</a>
            
            <ConversationEditTitleButton name={name} id={id} />
        </li>
    );
}