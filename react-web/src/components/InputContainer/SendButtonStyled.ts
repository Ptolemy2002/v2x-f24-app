import { SendButtonProps } from "./Types";
import Base from "./SendButtonBase";
import styled from "styled-components";
import { buttonStyles, evaluateButtonStyles } from "src/lib/Styles";

export default Object.assign(
    styled(Base).attrs<SendButtonProps["style"]>(
        ({theme, ...props}) => ({
            ...evaluateButtonStyles(theme, props, "send"),
            $padding: props.$padding ?? "5px",
            $css: props.$css ?? null,
        })
    )`
        ${(props) => buttonStyles(props)}
        
        padding: ${({$padding}) => $padding};
        height: fit-content;
        margin-top: auto;
        margin-bottom: auto;

        ${({$css}) => $css}
    `,
    {
        displayName: "styled(SendButton)",
    }
);