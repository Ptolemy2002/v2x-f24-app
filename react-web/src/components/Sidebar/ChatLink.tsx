import useAppSearchParamState from "src/SearchParams";
import {ChatLinkProps} from "./Types";
import clsx from "clsx";

export default function ChatLinkBase({text, id, className, ...props}: ChatLinkProps) {
    const {convo, setConvo} = useAppSearchParamState();

    return (
        // clsx is just a utility that lets us combine class names. Falsy values do not get added to the class list,
        // which is why "active" is only added when the active prop is true.
        <li className={clsx("chat-link", convo === id && "active", className)} {...props}>
            <a onClick={() => setConvo(id)}>{text}</a>
        </li>
    );
}