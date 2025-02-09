import { UploadModalProps } from "./Types";
import Base from "./Base";
import styled from "styled-components";
import { WithCSSProp } from "@ptolemy2002/react-styled-component-utils";
import { evaluateModalStyles, modalStyles } from "src/lib/Styles";

export default Object.assign(
    styled(Base).attrs<WithCSSProp<UploadModalProps["style"]>>(
        ({ theme, ...props }) => ({
            ...evaluateModalStyles(theme, props, "upload"),
            $css: props.$css ?? null
        })
    )`
        ${props => modalStyles(props)}
        
        ${({ $css }) => $css}
    `,
    {
        displayName: "styled(UploadModal)",
    }
);