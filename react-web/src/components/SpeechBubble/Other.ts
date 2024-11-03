import { SpeechBubbleMessage, SpeechBubbleMessageOrigin, SpeechBubbleMessageOfType, SpeechBubbleMessageExclusiveProps } from "./Types";
import { RequiredCSSProperties, alignLeft, alignRight, bsBreakpointMax, bsBreakpointMin } from "src/Style";
import { css } from "styled-components";

export function addMessage<T extends SpeechBubbleMessage["type"]>(
    messages: SpeechBubbleMessage[],
    type: T,
    origin: SpeechBubbleMessageOrigin,
    createMessage: () => SpeechBubbleMessageExclusiveProps<T>
): SpeechBubbleMessage[] {
    const newMessages = [...messages];

    newMessages.push({
        ...createMessage(),
        origin,
        type,
        date: new Date()
    } as SpeechBubbleMessageOfType<T>); // We use "as" to tell TypeScript that the type is correct because it can't be inferred.

    return newMessages;
}

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