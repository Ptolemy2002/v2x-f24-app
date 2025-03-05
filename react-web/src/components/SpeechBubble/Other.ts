import { RequiredCSSProperties, alignLeft, alignRight, bsBreakpointMax, bsBreakpointMin } from "@ptolemy2002/react-styled-component-utils";
import { css } from "styled-components";

export function speechBubbleBaseStyle(
    maxWidth: RequiredCSSProperties["maxWidth"],
    borderRadius: RequiredCSSProperties["borderRadius"],
    padding: RequiredCSSProperties["padding"],
) {
    return css`
        width: fit-content;
        max-width: ${maxWidth};

        display: flex;
        flex-direction: row;
        gap: 5px;

        ${
            bsBreakpointMax("lg", css`flex-direction: column-reverse;`)
        }

        &.recepient {
            ${bsBreakpointMin("xl", css`flex-direction: row-reverse;`)}
            ${alignLeft()}
        }

        &.sender {
            ${bsBreakpointMin("xl", css`flex-direction: row;`)}
            ${alignRight()}
        }

        > .speech-bubble-content {
            border-radius: ${borderRadius};
            padding: ${padding};
            flex-grow: 1;

            &.recepient {
                background-color: ${({theme}) => theme.recepient.color};
                color: ${({theme}) => theme.recepientTextColor ?? theme.textColor};
            }

            &.sender {
                background-color: ${({theme}) => theme.sender.color};
                color: ${({theme}) => theme.senderTextColor ?? theme.textColor};
            }
        }
    `;
}