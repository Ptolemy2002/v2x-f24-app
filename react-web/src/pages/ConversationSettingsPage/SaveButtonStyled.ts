import { ConversationSettingsSaveButtonProps } from "./Types";
import Base from "./SaveButtonBase";
import styled from "styled-components";
import { buttonStyles, evaluateButtonStyles } from "src/lib/Styles";

export default Object.assign(
    styled(Base).attrs<ConversationSettingsSaveButtonProps["style"]>(
        ({theme, ...props}) => ({
            ...evaluateButtonStyles(theme, props, "conversationSettingsSave"),
            $css: props.$css ?? null,
        })
    )`
        ${(props) => buttonStyles(props)}
        
        height: fit-content;
        margin-top: auto;
        margin-bottom: auto;

        ${({$css}) => $css}
    `,
    {
        displayName: "styled(ConversationSettingsSaveButton)"
    }
);