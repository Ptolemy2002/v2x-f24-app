import { HTMLProps, FC } from "react";
import { RequiredCSSProperties, StyledComponentPropsWithCSS, WithCSSProp } from "@ptolemy2002/react-styled-component-utils";
import { TimestampWrapperProps } from "src/components/TimestampWrapper";
import { AudioPlayerProps } from "src/components/AudioPlayer";
import {
    MessageOrigin, TextMessage, ImageMessage,
    AudioMessage
} from "shared";
import { DangerIconProps } from "src/components/icons/DangerIcon";

export type ScreenReaderTextProps = {
    text?: string;
    origin: MessageOrigin;
} & HTMLProps<HTMLSpanElement>;

// SpeechBubbleText will take a message object as well as the default properties for a paragraph element.
export type SpeechBubbleTextProps = StyledComponentPropsWithCSS<{
    message: TextMessage;
    TimestampWrapper?: FC<TimestampWrapperProps>;
    ScreenReaderText?: FC<ScreenReaderTextProps>;
    SpeechBubbleTimestamp?: FC<SpeechBubbleTimestampProps>;
} & HTMLProps<HTMLParagraphElement>, {
    maxWidth?: RequiredCSSProperties["maxWidth"];
    padding?: RequiredCSSProperties["padding"];
    borderRadius?: RequiredCSSProperties["borderRadius"];
}>;

// SpeechBubbleImage will take a message object as well as the default properties for an image element.
export type SpeechBubbleImageProps = StyledComponentPropsWithCSS<{
    message: ImageMessage;
    scrollToEnd: () => void; // Function type definitions have similar syntax to JavaScript arrow functions.
    // void just means that the function doesn't return anything.
    TimestampWrapper?: FC<TimestampWrapperProps>;
    ScreenReaderText?: FC<ScreenReaderTextProps>;
    SpeechBubbleTimestamp?: FC<SpeechBubbleTimestampProps>;
} & HTMLProps<HTMLDivElement>, {
    maxWidth?: RequiredCSSProperties["maxWidth"];
    borderThickness?: RequiredCSSProperties["borderWidth"];
    padding?: RequiredCSSProperties["padding"];
    borderRadius?: RequiredCSSProperties["borderRadius"];
    borderStyle?: RequiredCSSProperties["borderStyle"];
    borderColor?: RequiredCSSProperties["borderColor"];
}>;

// SpeechBubbleAudio will take a message object as well as the default properties for an audio element.
export type SpeechBubbleAudioProps = StyledComponentPropsWithCSS<{
    message: AudioMessage;
    scrollToEnd: () => void; // Function type definitions have similar syntax to JavaScript arrow functions.
    TimestampWrapper?: FC<TimestampWrapperProps>;
    ScreenReaderText?: FC<ScreenReaderTextProps>;
    SpeechBubbleTimestamp?: FC<SpeechBubbleTimestampProps>;
    AudioPlayer?: FC<AudioPlayerProps["functional"]>;
} & HTMLProps<HTMLDivElement>, {
    maxWidth?: RequiredCSSProperties["maxWidth"];
    maxWidthSm?: RequiredCSSProperties["maxWidth"];
    padding?: RequiredCSSProperties["padding"];
    borderRadius?: RequiredCSSProperties["borderRadius"];
}>;

export type SpeechBubbleTimestampProps = {
    text: string;
} & HTMLProps<HTMLSpanElement>;

export type SpeechBubbleTypingProps = StyledComponentPropsWithCSS<{
    origin: MessageOrigin;
    interval?: number;
    maxDots?: number;
    startDots?: number;
    ScreenReaderText?: FC<ScreenReaderTextProps>;
} & HTMLProps<HTMLDivElement>, {
    maxWidth?: RequiredCSSProperties["maxWidth"];
    minWidth?: RequiredCSSProperties["minWidth"];
    padding?: RequiredCSSProperties["padding"];
    borderRadius?: RequiredCSSProperties["borderRadius"];
    fontSize?: RequiredCSSProperties["fontSize"];
    lineHeightScale?: number;
}>;
export type SpeechBubbleTypingControllerProps = Pick<SpeechBubbleTypingProps["functional"], "startDots" | "maxDots" | "interval" | "className">;

export type SpeechBubbleDangerProps = StyledComponentPropsWithCSS<{
    origin: MessageOrigin;
    date: Date
    iconWidth?: RequiredCSSProperties["width"];
    iconHeight?: RequiredCSSProperties["height"];
    TimestampWrapper?: FC<TimestampWrapperProps & WithCSSProp>;
    ScreenReaderText?: FC<ScreenReaderTextProps & WithCSSProp>;
    SpeechBubbleTimestamp?: FC<SpeechBubbleTimestampProps & WithCSSProp>;
    RetryLink?: FC<SpeechBubbleRetryLinkProps["functional"]>;
    Icon?: FC<DangerIconProps>;
} & HTMLProps<HTMLParagraphElement>, {
    maxWidth?: RequiredCSSProperties["maxWidth"];
    padding?: RequiredCSSProperties["padding"];
    borderRadius?: RequiredCSSProperties["borderRadius"];
}>;

export type SpeechBubbleRetryLinkProps = StyledComponentPropsWithCSS<Omit<HTMLProps<HTMLAnchorElement>, "onClick">, {
    cursor?: RequiredCSSProperties["cursor"];
}>;