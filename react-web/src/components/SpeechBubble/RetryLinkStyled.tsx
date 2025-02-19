import { SpeechBubbleRetryLinkProps } from "./Types";
import RetryLink, {applySubComponents} from "./RetryLink";
import styled from "styled-components";

export default applySubComponents(Object.assign(
    styled(RetryLink).attrs<SpeechBubbleRetryLinkProps["style"]>(
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
));