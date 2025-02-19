import { speechBubbleBaseStyle } from "./Other";
import { SpeechBubbleAudioProps } from "./Types";
import Audio, {applySubComponents} from "./Audio";
import styled, { css } from "styled-components";
import { bsBreakpointMax } from "@ptolemy2002/react-styled-component-utils";
export default applySubComponents(Object.assign(
    styled(Audio).attrs<SpeechBubbleAudioProps["style"]>(
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
        displayName: "styled(SpeechBubbleAudio)",
    }
));