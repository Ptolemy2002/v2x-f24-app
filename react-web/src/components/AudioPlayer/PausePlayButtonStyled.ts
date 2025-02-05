import { PausePlayButtonProps } from "./Types";
import Base from "./PausePlayButtonBase";
import styled from "styled-components";
import { buttonStyles, evaluateButtonStyles } from "src/lib/Styles";

export default Object.assign(
    styled(Base).attrs<PausePlayButtonProps["style"]>(
        ({theme, ...props}) => ({
            ...evaluateButtonStyles(theme, props, "pausePlay"),
            $css: props.$css ?? null,
        })
    )`
        ${(props) => buttonStyles(props)}
        ${({$css}) => $css}
    `,
    {
        displayName: "styled(PausePlayButton)",
    }
);