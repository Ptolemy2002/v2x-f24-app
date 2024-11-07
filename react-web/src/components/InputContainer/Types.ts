import { FC, HTMLProps } from 'react';
import { RequiredCSSProperties } from 'src/Style';
import { RightArrowIconProps } from '../icons/RightArrowIcon';

export type InputContainerProps = HTMLProps<HTMLDivElement> & {
    RightArrowIcon?: FC<RightArrowIconProps>;
};

export type InputContainerStyleAttributes = {
    $gap?: RequiredCSSProperties["gap"];
    $maxHeight?: RequiredCSSProperties["maxHeight"];
    $minHeight?: RequiredCSSProperties["minHeight"];
    $borderRadius?: RequiredCSSProperties["borderRadius"];
    $padding?: RequiredCSSProperties["padding"];
    $sendButtonRadius?: RequiredCSSProperties["borderRadius"];
    $sendButtonPadding?: RequiredCSSProperties["padding"];
};