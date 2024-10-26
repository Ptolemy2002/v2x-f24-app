import clsx from "clsx";
import { HTMLProps } from "react";
import styled, {css} from "styled-components";
import AudioPlayer from "src/components/AudioPlayer";
import { alignLeft, alignRight, bsBreakpointMax, bsBreakpointMin } from "src/Style";
import { border } from "polished";
import TimestampWrapper from "src/components/TimestampWrapper";
import { RequiredCSSProperties } from "src/Style";

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

export function speechBubbleBaseStyle(
    maxWidth: RequiredCSSProperties["maxWidth"],
    borderRadius: RequiredCSSProperties["borderRadius"],
    padding: RequiredCSSProperties["padding"],
) {
    return css`
        width: fit-content;
        max-width: ${maxWidth};

        display: flex;
        flex-direction: row;
        gap: 5px;

        ${
            bsBreakpointMax("lg", css`flex-direction: column-reverse;`)
        }

        &.recepient {
            ${bsBreakpointMin("xl", css`flex-direction: row-reverse;`)}
            ${alignLeft()}
        }

        &.sender {
            ${bsBreakpointMin("xl", css`flex-direction: row;`)}
            ${alignRight()}
        }

        > .speech-bubble-content {
            border-radius: ${borderRadius};
            padding: ${padding};
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
        <div className={clsx("speech-bubble-txt", message.origin, className)} {...props}>
            <TimestampWrapper date={message.date} updateInterval={10} render={(text) => <SpeechBubbleTimestamp text={text} />} />
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
        </div>
    );
}

export type SpeechBubbleTextStyleAttributes = {
    $maxWidth?: RequiredCSSProperties["maxWidth"];
    $padding?: RequiredCSSProperties["padding"];
    $borderRadius?: RequiredCSSProperties["borderRadius"];
};
export const SpeechBubbleText = styled(_SpeechBubbleText).attrs<SpeechBubbleTextStyleAttributes>(
    (props) => ({
        $maxWidth: props.$maxWidth ?? "75%",
        $padding: props.$padding ?? "10px",
        $borderRadius: props.$borderRadius ?? "10px",
    })
)`
    ${({$maxWidth, $padding, $borderRadius}) => speechBubbleBaseStyle($maxWidth!, $borderRadius!, $padding!)}
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
            <TimestampWrapper date={message.date} updateInterval={10} render={(text) => <SpeechBubbleTimestamp text={text} />} />
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

export type SpeechBubbleImageStyleAttributes = {
    $maxWidth?: RequiredCSSProperties["maxWidth"];
    $borderThickness?: RequiredCSSProperties["borderWidth"];
    $padding?: RequiredCSSProperties["padding"];
    $borderRadius?: RequiredCSSProperties["borderRadius"];
    $borderStyle?: RequiredCSSProperties["borderStyle"];
    $borderColor?: RequiredCSSProperties["borderColor"];
};
export const SpeechBubbleImage = styled(_SpeechBubbleImage).attrs<SpeechBubbleImageStyleAttributes>(
    (props) => ({
        $maxWidth: props.$maxWidth ?? "50%",
        $padding: props.$padding ?? "10px",
        $borderRadius: props.$borderRadius ?? "10px",
        $borderThickness: props.$borderThickness ?? "1px",
        $borderStyle: props.$borderStyle ?? "solid",
        $borderColor: props.$borderColor ?? "black",
    })
)`
    ${({$maxWidth, $padding, $borderRadius}) => speechBubbleBaseStyle($maxWidth!, $borderRadius!, $padding!)}
    > .speech-bubble-content {
        > img {
            max-width: 100%;
            height: auto;
            ${({$borderThickness, $borderStyle, $borderColor}) => border(
                $borderThickness!,
                $borderStyle!,
                $borderColor!
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
            <TimestampWrapper date={message.date} updateInterval={10} render={(text) => <SpeechBubbleTimestamp text={text} />} />
            
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

export type SpeechBubbleAudioStyleAttributes = {
    $maxWidth?: RequiredCSSProperties["maxWidth"];
    $padding?: RequiredCSSProperties["padding"];
    $borderRadius?: RequiredCSSProperties["borderRadius"];
};
export const SpeechBubbleAudio = styled(_SpeechBubbleAudio).attrs<SpeechBubbleAudioStyleAttributes>(
    (props) => ({
        $maxWidth: props.$maxWidth ?? "50%",
        $padding: props.$padding ?? "10px",
        $borderRadius: props.$borderRadius ?? "10px",
    })
)`
    ${({$maxWidth, $padding, $borderRadius}) => speechBubbleBaseStyle($maxWidth!, $borderRadius!, $padding!)}
    width: 100%; // This will be capped by the max-width property
`;
SpeechBubbleAudio.displayName = "SpeechBubbleAudio";

export type SpeechBubbleTimestampProps = {
    text: string
} & HTMLProps<HTMLSpanElement>;
function _SpeechBubbleTimestamp({text, className, ...props}: SpeechBubbleTimestampProps) {
    return (
        <span className={clsx("speech-bubble-timestamp", className)} {...props}>
            {text}
        </span>
    );
}

export const SpeechBubbleTimestamp = styled(_SpeechBubbleTimestamp)`
    color: ${({theme}) => theme.timestampColor};
    min-width: fit-content;
`;
SpeechBubbleTimestamp.displayName = "SpeechBubbleTimestamp";