import { HTMLProps } from 'react';
import { RequiredCSSProperties } from 'src/Style';

export type InputContainerProps = HTMLProps<HTMLDivElement>;

export type InputContainerStyleAttributes = {
    $gap?: RequiredCSSProperties["gap"];
    $maxHeight?: RequiredCSSProperties["maxHeight"];
    $minHeight?: RequiredCSSProperties["minHeight"];
    $borderRadius?: RequiredCSSProperties["borderRadius"];
    $padding?: RequiredCSSProperties["padding"];
    $sendButtonRadius?: RequiredCSSProperties["borderRadius"];
    $sendButtonPadding?: RequiredCSSProperties["padding"];
};