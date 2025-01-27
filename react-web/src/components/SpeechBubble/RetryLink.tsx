import clsx from "clsx";
import { SpeechBubbleRetryLinkProps } from "./Types";
import ConversationData from "src/data/ConversationData";

export default function SpeechBubbleRetryLinkBase(
    {
        className,
        children,
        ...props
    }: SpeechBubbleRetryLinkProps["functional"]
) {
    // We're only sending commands, so don't need to have any dependencies.
    const [conversationData] = ConversationData.useContextNonNullable([]);

    return (
        <a
            {...props}
            className={clsx("speech-bubble-retry-link", className)}
            onClick={() => conversationData.queryBot()}
        >
            {children}
        </a>
    );
}