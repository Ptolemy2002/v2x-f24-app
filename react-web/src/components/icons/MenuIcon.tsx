import SVG from 'react-inlinesvg';
import { RequiredCSSProperties, WithCSSProp } from 'src/Style';
import styled from 'styled-components';

export type MenuIconStyleAttributes = {
    $fill?: RequiredCSSProperties['fill'] | null;
    $width?: RequiredCSSProperties['width'];
    $height?: RequiredCSSProperties['height'];
};

export default styled(SVG).attrs<WithCSSProp<MenuIconStyleAttributes>>(
    (props) => ({
        src: '/icons/menu.svg',
        $fill: props.$fill ?? null,
        $width: props.$width ?? '24px',
        $height: props.$height ?? '24px',
    })
)`
    width: ${({$width}) => $width};
    height: ${({$height}) => $height};
    margin: 0 8px;

    > path {
        stroke: ${({$fill, theme}) => $fill ?? theme.textColor};
    }
`;