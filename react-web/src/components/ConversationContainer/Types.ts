import { RequiredCSSProperties, StyledComponentPropsWithCSS } from "@ptolemy2002/react-styled-component-utils";
import { FC, HTMLProps } from "react";
import { SpeechContainerProps, SpeechContainerStyleAttributes } from "src/components/SpeechContainer";
import { InputContainerProps, InputContainerStyleAttributes } from "src/components/InputContainer";

export type ConversationContainerProps = StyledComponentPropsWithCSS<{
    SpeechContainer?: FC<SpeechContainerProps & SpeechContainerStyleAttributes>;
    InputContainer?: FC<InputContainerProps & InputContainerStyleAttributes>;
} & HTMLProps<HTMLDivElement>, {
    padding?: RequiredCSSProperties["padding"];
}>;