import clsx from "clsx";
import { HTMLProps, useEffect } from "react";
import styled, {css} from "styled-components";
import AudioPlayer from "src/components/AudioPlayer";
import { alignLeft, alignRight, SPEECH_BUBBLE_AUD_WIDTH, SPEECH_BUBBLE_IMG_BORDER_COLOR, SPEECH_BUBBLE_IMG_BORDER_STYLE, SPEECH_BUBBLE_IMG_BORDER_THICKNESS, SPEECH_BUBBLE_IMG_MAX_WIDTH, SPEECH_BUBBLE_MAX_WIDTH, SPEECH_BUBBLE_PADDING, SPEECH_BUBBLE_RADIUS } from "src/Style";
import { border } from "polished";
import { formatDistanceToNow, secondsToMilliseconds } from "date-fns";
import useForceRerender from "@ptolemy2002/react-force-rerender";

// The message can only originate from the sender or the recipient.
export type SpeechBubbleMessageOrigin = "sender" | "recepient";

// Define the base separately to reduce repetition.
export type SpeechBubbleMessageBase<T extends string> = {
    origin: SpeechBubbleMessageOrigin;
    type: T;
    date: Date;
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

export function speechBubbleBaseStyle(maxWidth: string | number) {
    return css`
        width: fit-content;
        max-width: ${maxWidth};

        display: flex;
        flex-direction: row;
        gap: 5px;

        &.recepient {
            flex-direction: row-reverse;
            ${alignLeft()}
        }

        &.sender {
            flex-direction: row;
            ${alignRight()}
        }

        > .speech-bubble-content {
            border-radius: ${SPEECH_BUBBLE_RADIUS};
            padding: ${SPEECH_BUBBLE_PADDING};
            flex-grow: 1;

            &.recepient {
                background-color: ${({theme}) => theme.recepientColor};
                color: ${({theme}) => theme.recepientTextColor};
            }

            &.sender {
                background-color: ${({theme}) => theme.senderColor};
                color: ${({theme}) => theme.senderTextColor};
            }
        }
    `;
}

function _SpeechBubbleText({message, className, ...props}: SpeechBubbleTextProps) {
    const lines = message.text.split("\n");
    return (
        <p className={clsx("speech-bubble-txt", message.origin, className)} {...props}>
            <Timestamp date={message.date} />
            <div className={`speech-bubble-content ${message.origin}`}>
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
            </div>
        </p>
    );
}

export const SpeechBubbleText = styled(_SpeechBubbleText)`
    ${speechBubbleBaseStyle(SPEECH_BUBBLE_MAX_WIDTH)}
`;
SpeechBubbleText.displayName = "SpeechBubbleText";

// SpeechBubbleImage will take a message object as well as the default properties for an image element.
export type SpeechBubbleImageProps = {
    message: SpeechBubbleImageMessage;
    scrollToEnd: () => void; // Function type definitions have similar syntax to JavaScript arrow functions.
    // void just means that the function doesn't return anything.
} & HTMLProps<HTMLDivElement>;

function _SpeechBubbleImage({message, scrollToEnd, className, ...props}: SpeechBubbleImageProps) {
    return (
        <div
            className={clsx("speech-bubble-img", message.origin, className)}
            {...props} // Pass any additional props to the element itself.
        >
            <Timestamp date={message.date} />
            <div className={`speech-bubble-content ${message.origin}`}>
                <ScreenReaderText origin={message.origin} text="sent an image" />
                <img
                    onLoad={scrollToEnd}
                    src={message.src}
                    alt={message.alt ?? ""} // ?? here is the nullish coalescing operator, which returns the right side if the left side is null or undefined.
                />
            </div>
        </div>
    );
}

export const SpeechBubbleImage = styled(_SpeechBubbleImage)`
    ${speechBubbleBaseStyle(SPEECH_BUBBLE_IMG_MAX_WIDTH)}
    > .speech-bubble-content {
        > img {
            max-width: 100%;
            height: auto;
            ${border(
                SPEECH_BUBBLE_IMG_BORDER_THICKNESS,
                SPEECH_BUBBLE_IMG_BORDER_STYLE,
                SPEECH_BUBBLE_IMG_BORDER_COLOR
            )}
        }
    }
`;
SpeechBubbleImage.displayName = "SpeechBubbleImage";

// SpeechBubbleAudio will take a message object as well as the default properties for an audio element.
export type SpeechBubbleAudioProps = {
    message: SpeechBubbleAudioMessage;
    scrollToEnd: () => void; // Function type definitions have similar syntax to JavaScript arrow functions.
} & HTMLProps<HTMLDivElement>;

function _SpeechBubbleAudio({message, className, scrollToEnd, ...props}: SpeechBubbleAudioProps) {
    return (
        <div className={clsx("speech-bubble-aud", message.origin, className)} {...props}>
            <Timestamp date={message.date} />
            <div className={`speech-bubble-content ${message.origin}`}>
                <ScreenReaderText origin={message.origin} text="sent an audio message" />

                <AudioPlayer
                    src={message.src}
                    onAudioLoaded={scrollToEnd}
                />
            </div>
        </div>
    );
}

export const SpeechBubbleAudio = styled(_SpeechBubbleAudio)`
    ${speechBubbleBaseStyle(SPEECH_BUBBLE_AUD_WIDTH)}
    width: 100%; // This will be capped by the max-width property
`;
SpeechBubbleAudio.displayName = "SpeechBubbleAudio";

export type TimestampProps = {
    date: Date;
    updateInterval?: number;
} & HTMLProps<HTMLSpanElement>;
function _Timestamp({date, className, updateInterval = 60, ...props}: TimestampProps) {
    // Update on the specified interval (once per minute by default).
    const forceRerender = useForceRerender();
    useEffect(() => {
        const interval = setInterval(forceRerender, secondsToMilliseconds(updateInterval));
        return () => clearInterval(interval);
    }, [forceRerender]);

    return (
        <span className={clsx("speech-bubble-timestamp", className)} {...props}>
            {formatDistanceToNow(date)} ago
        </span>
    );
}

export const Timestamp = styled(_Timestamp)`
    color: ${({theme}) => theme.timestampColor};
    min-width: fit-content;
`;