import { Dispatch, FC, HTMLProps } from "react";
import { SpeechBubbleAudioProps, SpeechBubbleImageProps, SpeechBubbleMessage, SpeechBubbleTextProps, SpeechBubbleTypingProps } from "src/components/SpeechBubble";
import { RequiredCSSProperties } from "src/Style";

export type ResponseData = {
    type: string;
    triggers?: string[];
    text?: string;
    src?: string;
    alt?: string;
};

export type SpeechContainerProps = {
    messages: SpeechBubbleMessage[];
    setMessages: Dispatch<SpeechBubbleMessage[]>;
    SpeechBubbleText?: FC<SpeechBubbleTextProps>;
    SpeechBubbleImage?: FC<SpeechBubbleImageProps>;
    SpeechBubbleAudio?: FC<SpeechBubbleAudioProps>;
    SpeechBubbleTyping?: FC<SpeechBubbleTypingProps>;
} & HTMLProps<HTMLDivElement>;

export type SpeechContainerStyleAttributes = {
    $marginBottom?: RequiredCSSProperties["marginBottom"];
    $gap?: RequiredCSSProperties["gap"];
};