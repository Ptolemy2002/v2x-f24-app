import clsx from "clsx";
import { HTMLProps } from "react";

type SpeechBubbleMessageBase<T extends string> = {
    origin: "sender" | "recepient";
    type: T;
}

export type SpeechBubbleTextMessage = {
    text: string;
} & SpeechBubbleMessageBase<"text">;

export type SpeechBubbleImageMessage = {
    src: string;
    alt?: string;
} & SpeechBubbleMessageBase<"image">;

export type SpeechBubbleMessage = SpeechBubbleTextMessage | SpeechBubbleImageMessage;

export type SpeechBubbleTextProps = {
    message: SpeechBubbleTextMessage;
} & HTMLProps<HTMLParagraphElement>;

export function SpeechBubbleText({message, className, ...props}: SpeechBubbleTextProps) {
    const lines = message.text.split("\n");
    return (
        <p className={clsx(message.type === "text" ? "speech-bubble" : "speech-bubble-img", message.origin, className)} {...props}>
            <span className="visually-hidden">
                {message.origin === "sender" ? "You said" : "Recipient said"}
            </span>
            {
                // Create a br element after each line except the last one.
                lines.map((line, i) => (
                    <span key={`line-${i}`}>
                        {line}
                        {i < lines.length - 1 && <br />}
                    </span>
                ))
            }
        </p>
    );
}

export type SpeechBubbleImageProps = {
    message: SpeechBubbleImageMessage;
    scrollToEnd: () => void;
} & HTMLProps<HTMLImageElement>;

export function SpeechBubbleImage({message, scrollToEnd, className, ...props}: SpeechBubbleImageProps) {
    return (
        <img
            className={clsx("speech-bubble", message.origin, className)}
            src={message.src}
            alt={message.alt ?? ""}
            onLoad={scrollToEnd}
            {...props}
        />
    );
}