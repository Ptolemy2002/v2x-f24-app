import ProgressBar from "./ProgressBar";
import styled, { css } from "styled-components";
import { bsBreakpointMax, WithCSSProp } from "@ptolemy2002/react-styled-component-utils";
import { isFirefox, isChrome, isSafari } from "react-device-detect";

export default Object.assign(
    styled(ProgressBar).attrs<WithCSSProp>(
        (props) => ({
            $css: props.$css ?? null
        })
    )`
        flex-grow: 1;

        background-color: ${({theme}) => theme.audioPlayer.backgroundColor};
        color: ${({theme}) => theme.audioPlayer.progressColor};
        ${
            (isChrome || isSafari) && css`
                &::-webkit-progress-value {
                    background-color: ${({theme}) => theme.audioPlayer.progressColor};
                }
                
                &::-webkit-progress-bar {
                    background-color: ${({theme}) => theme.audioPlayer.backgroundColor};
                }
            `
        }

        ${isFirefox && css`
            &::-moz-progress-bar {
                background-color: ${({theme}) => theme.audioPlayer.progressColor};
            }`
        }
        
        // Modify height based on screen size
        height: 50%;
        ${bsBreakpointMax("md", css`height: 75%;`)}
        ${bsBreakpointMax("sm", css`height: 100%;`)}

        border: none;
        margin-top: auto;
        margin-bottom: auto;

        ${({$css}) => $css}
    `,
    {
        displayName: "styled(ProgressBar)"
    }
);