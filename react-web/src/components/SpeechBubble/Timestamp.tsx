import { SpeechBubbleTimestampProps } from "./Types";
import clsx from "clsx";

export default function SpeechBubbleTimestamp({text, className, ...props}: SpeechBubbleTimestampProps) {
    return (
        <span className={clsx("speech-bubble-timestamp", className)} {...props}>
            {text}
        </span>
    );
}