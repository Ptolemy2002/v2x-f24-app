import { speechBubbleBaseStyle } from "./Other";
import { SpeechBubbleTextProps } from "./Types";
import Text, {applySubComponents} from "./Text";
import styled from "styled-components";

export default applySubComponents(Object.assign(
    styled(Text).attrs<SpeechBubbleTextProps["style"]>(
        (props) => ({
            $maxWidth: props.$maxWidth ?? "75%",
            $padding: props.$padding ?? "10px",
            $borderRadius: props.$borderRadius ?? "10px",
            $css: props.$css ?? null,
        })
    )`
        ${({$maxWidth, $padding, $borderRadius}) => speechBubbleBaseStyle($maxWidth!, $borderRadius!, $padding!)}

        ${({$css}) => $css}
    `,
    {
        displayName: "styled(SpeechBubbleText)",
    }
));