import { FC, HTMLProps } from 'react';
import { RequiredCSSProperties, StyledComponentPropsWithCSS } from '@ptolemy2002/react-styled-component-utils';
import { RightArrowIconProps } from '../icons/RightArrowIcon';
import { ButtonStyles } from 'styled-components';
import { ButtonProps } from 'react-bootstrap';
import { Override } from '@ptolemy2002/ts-utils';

export type InputContainerProps = StyledComponentPropsWithCSS<HTMLProps<HTMLDivElement> & {
    SendButton?: FC<SendButtonProps["functional"]>;
}, {
    gap: RequiredCSSProperties["gap"];
    maxHeight: RequiredCSSProperties["maxHeight"];
    minHeight: RequiredCSSProperties["minHeight"];
    borderRadius: RequiredCSSProperties["borderRadius"];
    padding: RequiredCSSProperties["padding"];
}>;

export type SendButtonProps = StyledComponentPropsWithCSS<Override<ButtonProps, {
    RightArrowIcon?: FC<RightArrowIconProps>;
}>, ButtonStyles & {
    padding: RequiredCSSProperties["padding"];
}>;