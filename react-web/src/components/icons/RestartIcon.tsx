import StaticSrcSVG, { StaticSrcSVGProps } from './Base';
import { RequiredCSSProperties, WithCSSProp } from 'src/Style';
import styled from 'styled-components';

export type RestartIconStyleAttributes = {
    $color?: RequiredCSSProperties['fill'] | null;
    $width?: RequiredCSSProperties['width'];
    $height?: RequiredCSSProperties['height'];
};

export type RestartIconProps = WithCSSProp<RestartIconStyleAttributes> & StaticSrcSVGProps;

const SVG = StaticSrcSVG('/icons/restart.svg');

export default Object.assign(
    styled(SVG).attrs<RestartIconProps>(
        (props) => ({
            $color: props.$color ?? null,
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

        ${({$css}) => $css}
    `,
    {
        displayName: 'RestartIcon'
    }
);