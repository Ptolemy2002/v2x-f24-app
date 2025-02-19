import { SpeechBubbleTimestampProps } from "./Types";
import clsx from "clsx";

function SpeechBubbleTimestampBase({text, className, ...props}: SpeechBubbleTimestampProps) {
    return (
        <span className={clsx("speech-bubble-timestamp", className)} {...props}>
            {text}
        </span>
    );
}

export function applySubComponents<
    T extends typeof SpeechBubbleTimestampBase
>(C: T) {
    return Object.assign(C, {});
}

export default applySubComponents(SpeechBubbleTimestampBase);