import clsx from "clsx";
import { SpeechBubbleRetryLinkProps } from "./Types";
import ConversationData from "src/data/ConversationData";

export default function SpeechBubbleRetryLink(
    {
        className,
        children,
        ...props
    }: SpeechBubbleRetryLinkProps
) {
    // We're only sending commands, so don't need to have any dependencies.
    const [_conversationData] = ConversationData.useContext([]);
    const conversationData = _conversationData!;

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