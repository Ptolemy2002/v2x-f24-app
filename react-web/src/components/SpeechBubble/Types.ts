import { HTMLProps, FC } from "react";
import { RequiredCSSProperties, WithCSSProp } from "src/Style";
import { TimestampWrapperProps } from "src/components/TimestampWrapper";
import { AudioPlayerProps } from "src/components/AudioPlayer";
import {
    SpeechBubbleMessageOrigin, SpeechBubbleTextMessage, SpeechBubbleImageMessage,
    SpeechBubbleAudioMessage
} from "src/data/ConversationData";

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
    $minWidth?: RequiredCSSProperties["minWidth"];
    $padding?: RequiredCSSProperties["padding"];
    $borderRadius?: RequiredCSSProperties["borderRadius"];
    $fontSize?: RequiredCSSProperties["fontSize"];
    $lineHeightScale?: number;
}>;