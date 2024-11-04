import { HTMLProps, FC } from "react";
import { RequiredCSSProperties, WithCSSProp } from "src/Style";
import { TimestampWrapperProps } from "src/components/TimestampWrapper";
import { AudioPlayerProps } from "src/components/AudioPlayer";

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

// SpeechBubbleText will take a message object as well as the default properties for a paragraph element.
export type SpeechBubbleTextProps = {
    message: SpeechBubbleTextMessage;
    TimestampWrapper?: FC<TimestampWrapperProps>;
    ScreenReaderText?: FC<ScreenReaderTextProps>;
    SpeechBubbleTimestamp?: FC<SpeechBubbleTimestampProps>;
} & HTMLProps<HTMLParagraphElement>;

export type SpeechBubbleTextStyleAttributes = WithCSSProp<{
    $maxWidth?: RequiredCSSProperties["maxWidth"];
    $padding?: RequiredCSSProperties["padding"];
    $borderRadius?: RequiredCSSProperties["borderRadius"];
}>;

// SpeechBubbleImage will take a message object as well as the default properties for an image element.
export type SpeechBubbleImageProps = {
    message: SpeechBubbleImageMessage;
    scrollToEnd: () => void; // Function type definitions have similar syntax to JavaScript arrow functions.
    // void just means that the function doesn't return anything.
    TimestampWrapper?: FC<TimestampWrapperProps>;
    ScreenReaderText?: FC<ScreenReaderTextProps>;
    SpeechBubbleTimestamp?: FC<SpeechBubbleTimestampProps>;
} & HTMLProps<HTMLDivElement>;

export type SpeechBubbleImageStyleAttributes = WithCSSProp<{
    $maxWidth?: RequiredCSSProperties["maxWidth"];
    $borderThickness?: RequiredCSSProperties["borderWidth"];
    $padding?: RequiredCSSProperties["padding"];
    $borderRadius?: RequiredCSSProperties["borderRadius"];
    $borderStyle?: RequiredCSSProperties["borderStyle"];
    $borderColor?: RequiredCSSProperties["borderColor"];
}>;

// SpeechBubbleAudio will take a message object as well as the default properties for an audio element.
export type SpeechBubbleAudioProps = {
    message: SpeechBubbleAudioMessage;
    scrollToEnd: () => void; // Function type definitions have similar syntax to JavaScript arrow functions.
    TimestampWrapper?: FC<TimestampWrapperProps>;
    ScreenReaderText?: FC<ScreenReaderTextProps>;
    SpeechBubbleTimestamp?: FC<SpeechBubbleTimestampProps>;
    AudioPlayer?: FC<AudioPlayerProps>;
} & HTMLProps<HTMLDivElement>;

export type SpeechBubbleAudioStyleAttributes = WithCSSProp<{
    $maxWidth?: RequiredCSSProperties["maxWidth"];
    $maxWidthSm?: RequiredCSSProperties["maxWidth"];
    $padding?: RequiredCSSProperties["padding"];
    $borderRadius?: RequiredCSSProperties["borderRadius"];
}>;

export type SpeechBubbleTimestampProps = {
    text: string;
} & HTMLProps<HTMLSpanElement>;

export type SpeechBubbleTypingProps = {
    origin: SpeechBubbleMessageOrigin;
    interval?: number;
    maxDots?: number;
    startDots?: number;
    ScreenReaderText?: FC<ScreenReaderTextProps>;
} & HTMLProps<HTMLDivElement>;

export type SpeechBubbleTypingStyleAttributes = WithCSSProp<{
    $maxWidth?: RequiredCSSProperties["maxWidth"];
    $padding?: RequiredCSSProperties["padding"];
    $borderRadius?: RequiredCSSProperties["borderRadius"];
    $fontSize?: RequiredCSSProperties["fontSize"];
    maxDots?: number;
}>;