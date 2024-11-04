import { speechBubbleBaseStyle } from "./Other";
import { SpeechBubbleAudioStyleAttributes } from "./Types";
import Audio from "./Audio";
import styled, { css } from "styled-components";
import { bsBreakpointMax } from "src/Style";
export default Object.assign(
    styled(Audio).attrs<SpeechBubbleAudioStyleAttributes>(
        (props) => ({
            $maxWidth: props.$maxWidth ?? "75%",
            $maxWidthSm: props.$maxWidthSm ?? "90%",
            $padding: props.$padding ?? "10px",
            $borderRadius: props.$borderRadius ?? "10px",
            $css: props.$css ?? null,
        })
    )`
        ${({$maxWidth, $padding, $borderRadius}) => speechBubbleBaseStyle($maxWidth!, $borderRadius!, $padding!)}
        width: 100%; // This will be capped by the max-width property

        // Override the max-width property for smaller screens.
        ${({$maxWidthSm}) => bsBreakpointMax("sm", css`max-width: ${$maxWidthSm};`)}

        ${({$css}) => $css}
    `,
    {
        displayName: "SpeechBubbleAudio",
    }
);