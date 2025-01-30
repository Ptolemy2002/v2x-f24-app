import StaticSrcSVG, { StaticSrcSVGProps } from './Base';
import { RequiredCSSProperties, WithCSSProp } from '@ptolemy2002/react-styled-component-utils';
import styled from 'styled-components';

// Side effect import so that the compiler knows this is being used
import "/icons/pause.svg";

export type PauseIconStyleAttributes = {
    $color?: RequiredCSSProperties['fill'] | null;
    $width?: RequiredCSSProperties['width'];
    $height?: RequiredCSSProperties['height'];
};

export type PauseIconProps = WithCSSProp<PauseIconStyleAttributes> & StaticSrcSVGProps;

const SVG = StaticSrcSVG('/icons/pause.svg');

export default Object.assign(
    styled(SVG).attrs<PauseIconProps>(
        (props) => ({
            $color: props.$color ?? null,
            $width: props.$width ?? '24px',
            $height: props.$height ?? 'auto',
            $css: props.$css ?? null
        })
    )`
        width: ${({$width}) => $width};
        height: ${({$height}) => $height};

        > line {
            stroke: ${({$color}) => $color ?? "currentColor"};
        }

        &.loader {
            > path {
                fill: ${({$color}) => $color ?? "currentColor"};
            }
        }

        ${({$css}) => $css}
    `,
    {
        displayName: 'PauseIcon'
    }
);