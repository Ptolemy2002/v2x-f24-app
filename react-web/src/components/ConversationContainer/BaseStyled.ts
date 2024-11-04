import styled from "styled-components";
import { ConversationContainerStyleAttributes } from "./Types";
import Base from "./Base";

export default Object.assign(
    styled(Base).attrs<ConversationContainerStyleAttributes>(
        (props) => ({
            $padding: props.$padding ?? "10px",
            $css: props.$css ?? null,
        })
    )`
        display: flex;
        flex-direction: column;
        padding: ${({$padding}) => $padding};

        ${({$css}) => $css}
    `,
    {
        displayName: "ConversationContainer",
    }
);