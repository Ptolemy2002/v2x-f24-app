import { math } from "polished";
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
            $fontSize: props.$fontSize ?? "3rem",
            // ch is based on the width of the 0 character in the font. In monospace fonts, this is the same for all characters.
            // In non-monospace fonts, it's good enough for a rough estimate.
            $minWidth: props.$minWidth ?? ((props.maxDots ?? 3) / 2.5) + "ch",
            $css: props.$css ?? null,
        })
    )`
        ${({$maxWidth, $padding, $borderRadius}) => speechBubbleBaseStyle($maxWidth!, $borderRadius!, $padding!)}

        > .speech-bubble-content {
            padding-bottom: 0;

            > .typing-indicator {
                display: inline-block;
                font-size: ${({$fontSize}) => $fontSize};
                line-height: ${({$fontSize}) => math(`${$fontSize} / 2`)};
                min-width: ${({$minWidth}) => $minWidth};   
            }
        }

        ${({$css}) => $css}
    `,
    {
        displayName: "styled(SpeechBubbleTyping)",
    }
);