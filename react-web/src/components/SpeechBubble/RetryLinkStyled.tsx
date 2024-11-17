import { SpeechBubbleRetryLinkStyleAttributes } from "./Types";
import RetryLink from "./RetryLink";
import styled from "styled-components";

export default Object.assign(
    styled(RetryLink).attrs<SpeechBubbleRetryLinkStyleAttributes>(
        (props) => ({
            $cursor: props.$cursor ?? "pointer",
            $css: props.$css ?? null,
        })
    )`
        cursor: ${({$cursor}) => $cursor};
        ${({$css}) => $css}
    `,
    {
        displayName: "styled(SpeechBubbleDanger)",
    }
);