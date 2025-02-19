import clsx from "clsx";
import { SpeechBubbleRetryLinkProps } from "./Types";
import ConversationData from "src/data/ConversationData";

function SpeechBubbleRetryLinkBase(
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

export function applySubComponents<
    T extends typeof SpeechBubbleRetryLinkBase
>(C: T) {
    return Object.assign(C, {});
}

export default applySubComponents(SpeechBubbleRetryLinkBase);