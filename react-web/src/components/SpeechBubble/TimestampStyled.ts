import Timestamp from './Timestamp';
import styled from 'styled-components';
import { WithCSSProp } from 'src/Style';

export default Object.assign(
    styled(Timestamp).attrs<WithCSSProp>(
        (props) => ({
            $css: props.$css ?? null,
        })
    )`
        color: ${({theme}) => theme.timestampColor};
        min-width: fit-content;

        ${({$css}) => $css}
    `,
    {
        displayName: "styled(SpeechBubbleTimestamp)",
    }
);