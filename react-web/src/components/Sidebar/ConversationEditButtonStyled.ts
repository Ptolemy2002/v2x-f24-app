import styled from "styled-components";
import { ConversationEditButtonProps } from "./Types";
import Base from "./ConversationEditButton";
import { buttonStyles, evaluateButtonStyles } from "src/lib/Styles";

export default Object.assign(
    styled(Base).attrs<ConversationEditButtonProps["style"]>(
        ({theme, ...props}) => ({
            ...evaluateButtonStyles(theme, props, "conversationEdit"),
            $css: props.$css ?? null
        })
    )`
        ${props => buttonStyles(props)}

        padding: 0;

        ${({$css}) => $css}
    `,
    {
        displayName: "styled(ConversationEditButton)",
    }
);