import StaticSrcSVG, { StaticSrcSVGProps } from './Base';
import { RequiredCSSProperties, WithCSSProp } from '@ptolemy2002/react-styled-component-utils';
import styled from 'styled-components';

// Side effect import so that the compiler knows this is being used
import "/icons/play.svg";

export type PlayIconStyleAttributes = {
    $color?: RequiredCSSProperties['fill'] | null;
    $width?: RequiredCSSProperties['width'];
    $height?: RequiredCSSProperties['height'];
};

export type PlayIconProps = WithCSSProp<PlayIconStyleAttributes> & StaticSrcSVGProps;

const SVG = StaticSrcSVG('/icons/play.svg');

export default Object.assign(
    styled(SVG).attrs<WithCSSProp<PlayIconStyleAttributes>>(
        (props) => ({
            $color: props.$color ?? "currentcolor",
            $width: props.$width ?? '24px',
            $height: props.$height ?? 'auto',
            $css: props.$css ?? null
        })
    )`
        width: ${({$width}) => $width};
        height: ${({$height}) => $height};

        > path {
            stroke: ${({$color, theme}) => $color ?? theme.textColor};
        }

        &.loader {
            > path {
                fill: ${({$color, theme}) => $color ?? theme.textColor};
            }
        }

        ${({$css}) => $css}
    `,
    {
        displayName: 'PlayIcon'
    }
);