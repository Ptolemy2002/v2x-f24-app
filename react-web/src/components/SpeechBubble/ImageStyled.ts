import { speechBubbleBaseStyle } from "./Other";
import { SpeechBubbleImageStyleAttributes } from "./Types";
import Image from "./Image";
import styled from "styled-components";
import { border } from "polished";

export default Object.assign(
    styled(Image).attrs<SpeechBubbleImageStyleAttributes>(
        (props) => ({
            $maxWidth: props.$maxWidth ?? "50%",
            $padding: props.$padding ?? "10px",
            $borderRadius: props.$borderRadius ?? "10px",
            $borderThickness: props.$borderThickness ?? "1px",
            $borderStyle: props.$borderStyle ?? "solid",
            $borderColor: props.$borderColor ?? "black",
        })
    )`
        ${({$maxWidth, $padding, $borderRadius}) => speechBubbleBaseStyle($maxWidth!, $borderRadius!, $padding!)}
        > .speech-bubble-content {
            > img {
                max-width: 100%;
                height: auto;
                ${({$borderThickness, $borderStyle, $borderColor}) => border(
                    $borderThickness!,
                    $borderStyle!,
                    $borderColor!
                )}
            }
        }
    `,
    {
        displayName: "SpeechBubbleImage",
    }
);