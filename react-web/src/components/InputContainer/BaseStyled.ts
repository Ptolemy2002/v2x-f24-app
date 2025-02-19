import { InputContainerProps } from "./Types";
import Base, { applySubComponents } from "./Base";
import styled from "styled-components";
import { WithCSSProp } from "@ptolemy2002/react-styled-component-utils";

export default applySubComponents(Object.assign(
    styled(Base).attrs<WithCSSProp<InputContainerProps["style"]>>(
        (props) => ({
            $gap: props.$gap ?? "10px",
            $maxHeight: props.$maxHeight ?? "50%",
            $minHeight: props.$minHeight ?? "50px",
            $borderRadius: props.$borderRadius ?? "10px",
            $padding: props.$padding ?? "5px",
            $css: props.$css ?? null,
        })
    )`
        display: flex;
        flex-direction: row;
        gap: ${({$gap}) => $gap};
        max-height: ${({$maxHeight}) => $maxHeight};

        > .input {
            background-color: ${({theme}) => theme.input.color};
            color: ${({theme}) => theme.input.textColor ?? theme.textColor};
            border: none;

            min-height: ${({$minHeight}) => $minHeight};
            max-height: 100%;
            flex-grow: 1;

            border-radius: ${({$borderRadius}) => $borderRadius};
            padding: ${({$padding}) => $padding};
        }

        ${({ $css }) => $css}
    `,
    {
        displayName: "styled(InputContainer)",
    }
));