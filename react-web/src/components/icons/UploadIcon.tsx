import StaticSrcSVG, { StaticSrcSVGProps } from './Base';
import { RequiredCSSProperties, WithCSSProp } from '@ptolemy2002/react-styled-component-utils';
import styled from 'styled-components';

// Side effect import so that the compiler knows this is being used
import "/icons/upload.svg";

export type UploadIconStyleAttributes = {
    $color?: RequiredCSSProperties['fill'] | null;
    $width?: RequiredCSSProperties['width'];
    $height?: RequiredCSSProperties['height'];
};

export type UploadIconProps = WithCSSProp<UploadIconStyleAttributes> & StaticSrcSVGProps;

const SVG = StaticSrcSVG('/icons/upload.svg');

export default Object.assign(
    styled(SVG).attrs<UploadIconProps>(
        (props) => ({
            src: '/icons/upload.svg',
            $color: props.$color ?? null,
            $width: props.$width ?? '24px',
            $height: props.$height ?? 'auto',
            $css: props.$css ?? null
        })
    )`
        width: ${({$width}) => $width};
        height: ${({$height}) => $height};
        
        > path {
            stroke: ${({$color}) => $color ?? "currentcolor"};
        }

        &.loader {
            > path {
                fill: ${({$color}) => $color ?? "currentcolor"};
            }
        }

        ${({$css}) => $css}
    `,
    {
        displayName: 'RightArrowIcon'
    }
);