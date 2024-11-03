import { Dispatch, SetStateAction, HTMLProps } from 'react';
import { SpeechBubbleMessage } from 'src/components/SpeechBubble';
import { RequiredCSSProperties } from 'src/Style';

export type InputContainerProps = {
    setMessages: Dispatch<SetStateAction<SpeechBubbleMessage[]>>;
} & HTMLProps<HTMLDivElement>;

export type InputContainerStyleAttributes = {
    $gap?: RequiredCSSProperties["gap"];
    $maxHeight?: RequiredCSSProperties["maxHeight"];
    $minHeight?: RequiredCSSProperties["minHeight"];
    $borderRadius?: RequiredCSSProperties["borderRadius"];
    $padding?: RequiredCSSProperties["padding"];
    $sendButtonRadius?: RequiredCSSProperties["borderRadius"];
    $sendButtonPadding?: RequiredCSSProperties["padding"];
};