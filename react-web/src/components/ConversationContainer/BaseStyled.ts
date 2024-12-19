import styled from "styled-components";
import { ConversationContainerProps } from "./Types";
import Base from "./Base";

export default Object.assign(
    styled(Base).attrs<ConversationContainerProps["style"]>(
        (props) => ({
            $padding: props.$padding ?? "10px",
            $css: props.$css ?? null,
        })
    )`
        display: flex;
        flex-direction: column;
        padding: ${({$padding}) => $padding};

        &.not-selected {
            // Center the text vertically and horizontally
            justify-content: center;
            align-items: center;
        }

        > .error {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        ${({$css}) => $css}
    `,
    {
        displayName: "styled(ConversationContainer)",
    }
);