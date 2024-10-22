import clsx from "clsx";
import { HTMLProps } from "react";
import AudioPlayer from "src/components/AudioPlayer";

// The message can only originate from the sender or the recipient.
export type SpeechBubbleMessageOrigin = "sender" | "recepient";

// Define the base separately to reduce repetition.
export type SpeechBubbleMessageBase<T extends string> = {
    origin: SpeechBubbleMessageOrigin;
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

// SpeechBubbleAudio will take a src attribute as well as the default properties for a speech bubble.
export type SpeechBubbleAudioMessage = {
    src: string;
} & SpeechBubbleMessageBase<"audio">;

// Combined type for any speech bubble message.
export type SpeechBubbleMessage = SpeechBubbleTextMessage | SpeechBubbleImageMessage | SpeechBubbleAudioMessage;

// Combined type for all different types options for speech bubble messages.
export type SpeechBubbleMessageType = SpeechBubbleMessage["type"];

// Get the message object of the specified type where the type is just a string.
export type SpeechBubbleMessageOfType<T extends SpeechBubbleMessageType> = Extract<SpeechBubbleMessage, {type: T}>;

// Get the properties that are exclusive to the speech bubble of specified type
// (i.e. included in the specified speech bubble type but not in the base type).
export type SpeechBubbleMessageExclusiveProps<T extends SpeechBubbleMessageType> =
    Omit<SpeechBubbleMessageOfType<T>, keyof SpeechBubbleMessageBase<T>>;

export type ScreenReaderTextProps = {
    text?: string;
    origin: SpeechBubbleMessageOrigin;
} & HTMLProps<HTMLSpanElement>;
export function ScreenReaderText({text="said", origin}: ScreenReaderTextProps) {
    return (
        <span className="visually-hidden">
            {origin === "sender" ? `You ${text}` : `Recipient ${text}`}
        </span>
    );
}

// SpeechBubbleText will take a message object as well as the default properties for a paragraph element.
export type SpeechBubbleTextProps = {
    message: SpeechBubbleTextMessage;
} & HTMLProps<HTMLParagraphElement>;

export function SpeechBubbleText({message, className, ...props}: SpeechBubbleTextProps) {
    const lines = message.text.split("\n");
    return (
        <p className={clsx("speech-bubble", message.origin, className)} {...props}>
            <ScreenReaderText origin={message.origin} />

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
} & HTMLProps<HTMLDivElement>;

export function SpeechBubbleImage({message, scrollToEnd, className, ...props}: SpeechBubbleImageProps) {
    return (
        <div
            className={clsx("speech-bubble-img", message.origin, className)}
            {...props} // Pass any additional props to the element itself.
        >
            <ScreenReaderText origin={message.origin} text="sent an image" />
            <img
                onLoad={scrollToEnd}
                src={message.src}
                alt={message.alt ?? ""} // ?? here is the nullish coalescing operator, which returns the right side if the left side is null or undefined.
            />
        </div>
    );
}

// SpeechBubbleAudio will take a message object as well as the default properties for an audio element.
export type SpeechBubbleAudioProps = {
    message: SpeechBubbleAudioMessage;
    scrollToEnd: () => void; // Function type definitions have similar syntax to JavaScript arrow functions.
} & HTMLProps<HTMLDivElement>;

export function SpeechBubbleAudio({message, className, scrollToEnd, ...props}: SpeechBubbleAudioProps) {
    return (
        <div className={clsx("speech-bubble-aud", message.origin, className)} {...props}>
            <ScreenReaderText origin={message.origin} text="sent an audio message" />

            <AudioPlayer
                src={message.src}
                onAudioLoaded={scrollToEnd}
            />
        </div>
    );
}