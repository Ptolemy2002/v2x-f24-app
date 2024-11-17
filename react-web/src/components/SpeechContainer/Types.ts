import { FC, HTMLProps } from "react";
import {
    SpeechBubbleAudioProps, SpeechBubbleImageProps, SpeechBubbleTextProps, SpeechBubbleTypingProps,
    SpeechBubbleDangerProps,
    SpeechBubbleTextStyleAttributes,
    SpeechBubbleImageStyleAttributes,
    SpeechBubbleAudioStyleAttributes,
    SpeechBubbleTypingStyleAttributes,
    SpeechBubbleDangerStyleAttributes
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
    SpeechBubbleText?: FC<SpeechBubbleTextProps & SpeechBubbleTextStyleAttributes>;
    SpeechBubbleImage?: FC<SpeechBubbleImageProps & SpeechBubbleImageStyleAttributes>;
    SpeechBubbleAudio?: FC<SpeechBubbleAudioProps & SpeechBubbleAudioStyleAttributes>;
    SpeechBubbleTyping?: FC<SpeechBubbleTypingProps & SpeechBubbleTypingStyleAttributes>;
    SpeechBubbleDanger?: FC<SpeechBubbleDangerProps & SpeechBubbleDangerStyleAttributes>;
} & HTMLProps<HTMLDivElement>;

export type SpeechContainerStyleAttributes = WithCSSProp<{
    $marginBottom?: RequiredCSSProperties["marginBottom"];
    $gap?: RequiredCSSProperties["gap"];
}>;