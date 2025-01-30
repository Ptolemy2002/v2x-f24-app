import StaticSrcSVG, { StaticSrcSVGProps } from './Base';
import { RequiredCSSProperties, WithCSSProp } from '@ptolemy2002/react-styled-component-utils';
import styled from 'styled-components';

// Side effect import so that the compiler knows this is being used
import "/icons/pencil.svg";

export type RightArrowIconStyleAttributes = {
    $color?: RequiredCSSProperties['fill'] | null;
    $width?: RequiredCSSProperties['width'];
    $height?: RequiredCSSProperties['height'];
};

export type PencilIconProps = WithCSSProp<RightArrowIconStyleAttributes> & StaticSrcSVGProps;

const SVG = StaticSrcSVG('/icons/pencil.svg');

export default Object.assign(
    styled(SVG).attrs<PencilIconProps>(
        (props) => ({
            src: '/icons/pencil.svg',
            $color: props.$color ?? "currentcolor",
            $width: props.$width ?? '24px',
            $height: props.$height ?? 'auto',
            $css: props.$css ?? null
        })
    )`
        width: ${({$width}) => $width};
        height: ${({$height}) => $height};
        
        > path {
            fill: ${({$color}) => $color ?? "currentcolor"};
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
        displayName: 'PencilIcon'
    }
);