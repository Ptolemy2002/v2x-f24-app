import clsx from "clsx";
import { HTMLProps } from "react";

type SpeechBubbleMessageBase<T extends string> = {
    origin: "sender" | "recepient";
    type: T;
};

// SpeechBubbleText will take a message object as well as the default properties for a speech bubble.
export type SpeechBubbleTextMessage = {
    text: string;
} & SpeechBubbleMessageBase<"text">;

// SpeechBubbleImage will take a src and alt attribute as well as the default properties for a speech bubble.
export type SpeechBubbleImageMessage = {
    src: string;
    alt?: string;
} & SpeechBubbleMessageBase<"image">;

// Just a utility type here.
export type SpeechBubbleMessage = SpeechBubbleTextMessage | SpeechBubbleImageMessage;

// SpeechBubbleText will take a message object as well as the default properties for a paragraph element.
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
                        {
                            // If the left side is false, the expression evaluates to false, which means React
                            // won't render anything here. Otherwise, it will evaluate to the right side,
                            // which is a br element in this case.
                            i < lines.length - 1 && <br />
                        }
                    </span>
                ))
            }
        </p>
    );
}

// SpeechBubbleImage will take a message object as well as the default properties for an image element.
export type SpeechBubbleImageProps = {
    message: SpeechBubbleImageMessage;
    scrollToEnd: () => void; // Function type definitions have similar syntax to JavaScript arrow functions.
    // void just means that the function doesn't return anything.
} & HTMLProps<HTMLImageElement>;

export function SpeechBubbleImage({message, scrollToEnd, className, ...props}: SpeechBubbleImageProps) {
    return (
        <img
            className={clsx("speech-bubble", message.origin, className)}
            {...props} // Pass any additional props to the element itself.

            // This comes after the spread so that it can't be overridden by the props. className doesn't have that issue because we extract it above.
            onLoad={scrollToEnd}
            src={message.src}
            alt={message.alt ?? ""} // ?? here is the nullish coalescing operator, which returns the right side if the left side is null or undefined.
        />
    );
}