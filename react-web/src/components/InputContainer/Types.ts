import { FC, HTMLProps } from 'react';
import { RequiredCSSProperties, StyledComponentPropsWithCSS } from '@ptolemy2002/react-styled-component-utils';
import { RightArrowIconProps } from '../icons/RightArrowIcon';
import { UploadIconProps } from 'src/components/icons/UploadIcon';
import { SendButtonProps } from './SendButton';
import { UploadButtonProps } from './UploadButton';

export type InputContainerProps = StyledComponentPropsWithCSS<HTMLProps<HTMLDivElement> & {
    SendButton?: FC<SendButtonProps>;
    UploadButton?: FC<UploadButtonProps>;
    RightArrowIcon?: FC<RightArrowIconProps>;
    UploadIcon?: FC<UploadIconProps>;
}, {
    gap: RequiredCSSProperties["gap"];
    maxHeight: RequiredCSSProperties["maxHeight"];
    minHeight: RequiredCSSProperties["minHeight"];
    borderRadius: RequiredCSSProperties["borderRadius"];
    padding: RequiredCSSProperties["padding"];
}>;