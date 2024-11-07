import { speechBubbleBaseStyle } from "./Other";
import { SpeechBubbleTypingStyleAttributes } from "./Types";
import Typing from "./Typing";
import styled from "styled-components";

export default Object.assign(
    styled(Typing).attrs<SpeechBubbleTypingStyleAttributes>(
        (props) => ({
            $maxWidth: props.$maxWidth ?? "75%",
            $padding: props.$padding ?? "10px",
            $borderRadius: props.$borderRadius ?? "10px",
            $fontSize: props.$fontSize ?? "inherit",
            maxDots: props.maxDots ?? 3,
            $css: props.$css ?? null,
        })
    )`
        ${({$maxWidth, $padding, $borderRadius}) => speechBubbleBaseStyle($maxWidth!, $borderRadius!, $padding!)}

        font-size: ${({$fontSize}) => $fontSize};
        // ch is based on the width of the 0 character in the font. In monospace fonts, this is the same for all characters.
        // In non-monospace fonts, it's good enough for a rough estimate. We add 20% to the width to give some extra space.
        min-width: ${({maxDots}) => `${maxDots! * 1.2}ch`};

        ${({$css}) => $css}
    `,
    {
        displayName: "styled(SpeechBubbleTyping)",
    }
);