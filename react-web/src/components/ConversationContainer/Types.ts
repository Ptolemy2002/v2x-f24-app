import { RequiredCSSProperties, WithCSSProp } from "@ptolemy2002/react-styled-component-utils";
import { FC, HTMLProps } from "react";
import { SpeechContainerProps, SpeechContainerStyleAttributes } from "src/components/SpeechContainer";
import { InputContainerProps, InputContainerStyleAttributes } from "src/components/InputContainer";

export type ConversationContainerProps = {
    SpeechContainer?: FC<SpeechContainerProps & SpeechContainerStyleAttributes>;
    InputContainer?: FC<InputContainerProps & InputContainerStyleAttributes>;
} & HTMLProps<HTMLDivElement>;

export type ConversationContainerStyleAttributes = WithCSSProp<{
    $padding?: RequiredCSSProperties["padding"];
}>;