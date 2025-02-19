import { speechBubbleBaseStyle } from "./Other";
import { SpeechBubbleDangerProps } from "./Types";
import Danger, {applySubComponents} from "./Danger";
import styled from "styled-components";

export default applySubComponents(Object.assign(
    styled(Danger).attrs<SpeechBubbleDangerProps["style"]>(
        (props) => ({
            $maxWidth: props.$maxWidth ?? "75%",
            $padding: props.$padding ?? "10px",
            $borderRadius: props.$borderRadius ?? "10px",
            $css: props.$css ?? null,
        })
    )`
        ${({$maxWidth, $padding, $borderRadius}) => speechBubbleBaseStyle($maxWidth!, $borderRadius!, $padding!)}

        > .speech-bubble-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        ${({$css}) => $css}
    `,
    {
        displayName: "styled(SpeechBubbleDanger)",
    }
));