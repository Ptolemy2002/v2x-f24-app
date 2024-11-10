import { FC, HTMLProps } from "react";
import {
    SpeechBubbleAudioProps, SpeechBubbleImageProps, SpeechBubbleTextProps, SpeechBubbleTypingProps
} from "src/components/SpeechBubble";
import { RequiredCSSProperties, WithCSSProp } from "@ptolemy2002/react-styled-component-utils";

export type ResponseData = {
    type: string;
    triggers?: string[];
    text?: string;
    src?: string;
    alt?: string;
};

export type SpeechContainerProps = {
    SpeechBubbleText?: FC<SpeechBubbleTextProps>;
    SpeechBubbleImage?: FC<SpeechBubbleImageProps>;
    SpeechBubbleAudio?: FC<SpeechBubbleAudioProps>;
    SpeechBubbleTyping?: FC<SpeechBubbleTypingProps>;
} & HTMLProps<HTMLDivElement>;

export type SpeechContainerStyleAttributes = WithCSSProp<{
    $marginBottom?: RequiredCSSProperties["marginBottom"];
    $gap?: RequiredCSSProperties["gap"];
}>;