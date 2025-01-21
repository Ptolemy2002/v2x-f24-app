import { InputContainerProps } from "./Types";
import Base from "./Base";
import styled from "styled-components";
import { WithCSSProp } from "@ptolemy2002/react-styled-component-utils";
import { important } from "polished";

export default Object.assign(
    styled(Base).attrs<WithCSSProp<InputContainerProps["style"]>>(
        (props) => ({
            $gap: props.$gap ?? "10px",
            $maxHeight: props.$maxHeight ?? "50%",
            $minHeight: props.$minHeight ?? "50px",
            $borderRadius: props.$borderRadius ?? "10px",
            $padding: props.$padding ?? "5px",
            $sendButtonRadius: props.$sendButtonRadius ?? "5px",
            $sendButtonPadding: props.$sendButtonPadding ?? "5px",
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

        > .send-button {
            // important is used to override the default Bootstrap styles.
            ${({theme}) => important({backgroundColor: theme.sender.color})}
            color: ${({theme}) => theme.sender.textColor ?? theme.textColor};
            border: none;
            border-radius: ${({$sendButtonRadius}) => $sendButtonRadius};
            padding: ${({$sendButtonPadding}) => $sendButtonPadding};

            height: fit-content;
            margin-top: auto;
            margin-bottom: auto;

            ${({$css}) => $css}
    }
    `,
    {
        displayName: "styled(InputContainer)",
    }
);