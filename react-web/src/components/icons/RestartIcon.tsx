import SVG from 'react-inlinesvg';
import { RequiredCSSProperties, WithCSSProp } from 'src/Style';
import styled from 'styled-components';

export type RestartIconStyleAttributes = {
    $color?: RequiredCSSProperties['fill'] | null;
    $width?: RequiredCSSProperties['width'];
    $height?: RequiredCSSProperties['height'];
};

export default styled(SVG).attrs<WithCSSProp<RestartIconStyleAttributes>>(
    (props) => ({
        src: '/icons/restart.svg',
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
`;