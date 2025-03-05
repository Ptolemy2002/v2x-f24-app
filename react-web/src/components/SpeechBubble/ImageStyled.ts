import { speechBubbleBaseStyle } from "./Other";
import { SpeechBubbleImageProps } from "./Types";
import Image, {applySubComponents} from "./Image";
import styled from "styled-components";
import { border } from "polished";

export default applySubComponents(Object.assign(
    styled(Image).attrs<SpeechBubbleImageProps["style"]>(
        (props) => ({
            $maxWidth: props.$maxWidth ?? "50%",
            $padding: props.$padding ?? "10px",
            $borderRadius: props.$borderRadius ?? "10px",
            $borderThickness: props.$borderThickness ?? "1px",
            $borderStyle: props.$borderStyle ?? "solid",
            $borderColor: props.$borderColor ?? "black",
            $css: props.$css ?? null,
        })
    )`
        ${({$maxWidth, $padding, $borderRadius}) => speechBubbleBaseStyle($maxWidth!, $borderRadius!, $padding!)}
        > .speech-bubble-content {
            display: flex;
            flex-direction: column;
            align-items: center;

            img {
                max-width: 100%;
                height: auto;

                &:not(.loading-image) {
                    ${({$borderThickness, $borderStyle, $borderColor}) => border(
                        $borderThickness!,
                        $borderStyle!,
                        $borderColor!
                    )}
                }

                &.loading-image {
                    border: none;
                    width: 50%;
                }
            }
        }

        ${({$css}) => $css}
    `,
    {
        displayName: "styled(SpeechBubbleImage)",
    }
));