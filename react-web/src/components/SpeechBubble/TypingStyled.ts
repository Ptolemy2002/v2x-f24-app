import { math } from "polished";
import { speechBubbleBaseStyle } from "./Other";
import { SpeechBubbleTypingProps } from "./Types";
import Typing, {applySubComponents} from "./Typing";
import styled from "styled-components";

export default applySubComponents(Object.assign(
    styled(Typing).attrs<SpeechBubbleTypingProps["style"]>(
        (props) => ({
            $maxWidth: props.$maxWidth ?? "75%",
            $padding: props.$padding ?? "10px",
            $borderRadius: props.$borderRadius ?? "10px",
            $fontSize: props.$fontSize ?? "3rem",
            // ch is based on the width of the 0 character in the font. In monospace fonts, this is the same for all characters.
            // In non-monospace fonts, it's good enough for a rough estimate.
            $minWidth: props.$minWidth ?? ((props.maxDots ?? 3) / 2.5) + "ch",
            $lineHeightScale: props.$lineHeightScale ?? 0.5,

            $css: props.$css ?? null,
        })
    )`
        ${({$maxWidth, $padding, $borderRadius}) => speechBubbleBaseStyle($maxWidth!, $borderRadius!, $padding!)}

        > .speech-bubble-content {
            padding-bottom: 0;

            > .typing-indicator {
                display: inline-block;
                font-size: ${({$fontSize}) => $fontSize};
                line-height: ${({$fontSize, $lineHeightScale}) => math(`${$fontSize} * ${$lineHeightScale}`)};
                min-width: ${({$minWidth}) => $minWidth};   
            }
        }

        ${({$css}) => $css}
    `,
    {
        displayName: "styled(SpeechBubbleTyping)",
    }
));