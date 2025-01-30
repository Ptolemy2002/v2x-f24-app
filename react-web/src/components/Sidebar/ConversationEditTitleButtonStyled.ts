import styled from "styled-components";
import { ConversationEditTitleButtonProps } from "./Types";
import Base from "./ConversationEditTitleButtonBase";
import { buttonStyles, evaluateButtonStyles } from "src/lib/Styles";

export default Object.assign(
    styled(Base).attrs<ConversationEditTitleButtonProps["style"]>(
        ({theme, ...props}) => ({
            ...evaluateButtonStyles(theme, props, "conversationEditTitle"),
            $css: props.$css ?? null
        })
    )`
        ${props => buttonStyles(props)}

        padding: 0;

        ${({$css}) => $css}
    `,
    {
        displayName: "styled(ConversationEditTitleButton)",
    }
);