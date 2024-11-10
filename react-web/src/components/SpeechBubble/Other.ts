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
                background-color: ${({theme}) => theme.recepientColor};
                color: ${({theme}) => theme.recepientTextColor};
            }

            &.sender {
                background-color: ${({theme}) => theme.senderColor};
                color: ${({theme}) => theme.senderTextColor};
            }
        }
    `;
}