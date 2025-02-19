import Timestamp, {applySubComponents} from './Timestamp';
import styled from 'styled-components';
import { WithCSSProp } from '@ptolemy2002/react-styled-component-utils';

export default applySubComponents(Object.assign(
    styled(Timestamp).attrs<WithCSSProp>(
        (props) => ({
            $css: props.$css ?? null,
        })
    )`
        color: ${({theme}) => theme.timestamp?.color ?? theme.textColor};
        min-width: fit-content;

        ${({$css}) => $css}
    `,
    {
        displayName: "styled(SpeechBubbleTimestamp)",
    }
));