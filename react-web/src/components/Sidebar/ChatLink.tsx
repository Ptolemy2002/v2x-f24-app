import {ChatLinkProps} from "./Types";
import clsx from "clsx";

export default function ChatLink({text, href, active=false, className, ...props}: ChatLinkProps) {
    return (
        // clsx is just a utility that lets us combine class names. Falsy values do not get added to the class list,
        // which is why "active" is only added when the active prop is true.
        <li className={clsx("chat-link", active && "active", className)} {...props}>
            <a href={href}>{text}</a>
        </li>
    );
}