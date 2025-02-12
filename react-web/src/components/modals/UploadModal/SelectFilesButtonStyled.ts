import { SelectFilesButtonProps } from "./Types";
import Base from "./SelectFilesButton";
import styled from "styled-components";
import { WithCSSProp } from "@ptolemy2002/react-styled-component-utils";
import { buttonStyles, evaluateButtonStyles } from "src/lib/Styles";

export default Object.assign(
    styled(Base).attrs<WithCSSProp<SelectFilesButtonProps["style"]>>(
        ({ theme, ...props }) => ({
            ...evaluateButtonStyles(theme, props, "selectFiles"),
            $css: props.$css ?? null
        })
    )`
        ${props => buttonStyles(props)}
        ${({ $css }) => $css}
    `,
    {
        displayName: "styled(UploadModalSelectFilesButton)",
    }
);