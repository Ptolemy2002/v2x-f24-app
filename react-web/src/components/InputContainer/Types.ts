import { FC, HTMLProps } from 'react';
import { RequiredCSSProperties, StyledComponentPropsWithCSS } from '@ptolemy2002/react-styled-component-utils';
import { RightArrowIconProps } from '../icons/RightArrowIcon';

export type InputContainerProps = StyledComponentPropsWithCSS<HTMLProps<HTMLDivElement> & {
    RightArrowIcon?: FC<RightArrowIconProps>;
}, {
    gap: RequiredCSSProperties["gap"];
    maxHeight: RequiredCSSProperties["maxHeight"];
    minHeight: RequiredCSSProperties["minHeight"];
    borderRadius: RequiredCSSProperties["borderRadius"];
    padding: RequiredCSSProperties["padding"];
    sendButtonRadius: RequiredCSSProperties["borderRadius"];
    sendButtonPadding: RequiredCSSProperties["padding"];
}>;