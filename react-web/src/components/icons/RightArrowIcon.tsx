import SVG from 'react-inlinesvg';
import { RequiredCSSProperties, WithCSSProp } from 'src/Style';
import styled from 'styled-components';

export type RightArrowIconStyleAttributes = {
    src?: string;
    $color?: RequiredCSSProperties['fill'] | null;
    $width?: RequiredCSSProperties['width'];
    $height?: RequiredCSSProperties['height'];
};

export default styled(SVG).attrs<WithCSSProp<RightArrowIconStyleAttributes>>(
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
`;