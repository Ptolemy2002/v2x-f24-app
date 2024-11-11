import StaticSrcSVG, { StaticSrcSVGProps } from './Base';
import { RequiredCSSProperties, WithCSSProp } from '@ptolemy2002/react-styled-component-utils';
import styled from 'styled-components';

// Side effect import so that the compiler knows this is being used
import "/icons/right-arrow.svg";

export type RightArrowIconStyleAttributes = {
    $color?: RequiredCSSProperties['fill'] | null;
    $width?: RequiredCSSProperties['width'];
    $height?: RequiredCSSProperties['height'];
};

export type RightArrowIconProps = WithCSSProp<RightArrowIconStyleAttributes> & StaticSrcSVGProps;

const SVG = StaticSrcSVG('/icons/right-arrow.svg');

export default Object.assign(
    styled(SVG).attrs<RightArrowIconProps>(
        (props) => ({
            src: '/icons/right-arrow.svg',
            $color: props.$color ?? null,
            $width: props.$width ?? '24px',
            $height: props.$height ?? 'auto',
            $css: props.$css ?? null
        })
    )`
        width: ${({$width}) => $width};
        height: ${({$height}) => $height};

        > path {
            fill: ${({$color, theme}) => $color ?? theme.textColor};
            stroke: ${({$color, theme}) => $color ?? theme.textColor};
        }

        ${({$css}) => $css}
    `,
    {
        displayName: 'RightArrowIcon'
    }
);