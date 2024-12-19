import { FC, HTMLProps } from "react";
import {
    SpeechBubbleAudioProps, SpeechBubbleImageProps, SpeechBubbleTextProps, SpeechBubbleTypingProps,
    SpeechBubbleDangerProps
} from "src/components/SpeechBubble";
import { RequiredCSSProperties, StyledComponentPropsWithCSS } from "@ptolemy2002/react-styled-component-utils";

export type ResponseData = {
    type: string;
    triggers?: string[];
    text?: string;
    src?: string;
    alt?: string;
};

export type SpeechContainerProps = StyledComponentPropsWithCSS<{
    SpeechBubbleText?: FC<SpeechBubbleTextProps["functional"]>;
    SpeechBubbleImage?: FC<SpeechBubbleImageProps["functional"]>;
    SpeechBubbleAudio?: FC<SpeechBubbleAudioProps["functional"]>;
    SpeechBubbleTyping?: FC<SpeechBubbleTypingProps["functional"]>;
    SpeechBubbleDanger?: FC<SpeechBubbleDangerProps["functional"]>;
} & HTMLProps<HTMLDivElement>, {
    marginBottom?: RequiredCSSProperties["marginBottom"];
    gap?: RequiredCSSProperties["gap"];
}>;