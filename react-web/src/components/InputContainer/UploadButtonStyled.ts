import { UploadButtonProps } from "./Types";
import Base from "./UploadButtonBase";
import styled from "styled-components";
import { buttonStyles, evaluateButtonStyles } from "src/lib/Styles";

export default Object.assign(
    styled(Base).attrs<UploadButtonProps["style"]>(
        ({theme, ...props}) => ({
            ...evaluateButtonStyles(theme, props, "upload"),
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
        displayName: "styled(UploadButton)",
    }
);