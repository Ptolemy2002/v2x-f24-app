import StaticSrcSVG, { StaticSrcSVGProps } from './Base';
import { RequiredCSSProperties, WithCSSProp } from '@ptolemy2002/react-styled-component-utils';
import styled from 'styled-components';

// Side effect import so that the compiler knows this is being used
import "/icons/danger.svg";

export type DangerIconStyleAttributes = {
    $loaderColor?: RequiredCSSProperties['fill'] | null;
    $color?: RequiredCSSProperties['fill'] | null;
    $backgroundColor?: RequiredCSSProperties['fill'] | null;
    $width?: RequiredCSSProperties['width'];
    $height?: RequiredCSSProperties['height'];
};

export type DangerIconProps = WithCSSProp<DangerIconStyleAttributes> & StaticSrcSVGProps;

const SVG = StaticSrcSVG('/icons/danger.svg');

export default Object.assign(
    styled(SVG).attrs<DangerIconProps>(
        (props) => ({
            $loaderColor: props.$loaderColor ?? null,
            $color: props.$color ?? null,
            $width: props.$width ?? '24px',
            $height: props.$height ?? 'auto',
            $css: props.$css ?? null
        })
    )`
        width: ${({$width}) => $width};
        height: ${({$height}) => $height};

        > #fill {
            fill: ${({$backgroundColor, theme}) => $backgroundColor ?? theme.icons.danger.backgroundColor};
        }

        > #mark-line, > #mark-dot {
            fill: ${({$color, theme}) => $color ?? theme.icons.danger.color};
        }

        &.loader {
            > path {
                fill: ${({$loaderColor, theme}) => $loaderColor ?? theme.textColor};
            }
        }

        ${({$css}) => $css}
    `,
    {
        displayName: 'MenuIcon'
    }
);