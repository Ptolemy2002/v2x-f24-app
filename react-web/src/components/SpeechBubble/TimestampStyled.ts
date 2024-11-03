import Timestamp from './Timestamp';
import styled from 'styled-components';

export default Object.assign(
    styled(Timestamp)`
        color: ${({theme}) => theme.timestampColor};
        min-width: fit-content;
    `,
    {
        displayName: "SpeechBubbleTimestamp",
    }
);