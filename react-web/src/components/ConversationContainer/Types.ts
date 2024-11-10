import { RequiredCSSProperties, WithCSSProp } from "@ptolemy2002/react-styled-component-utils";
import { FC, HTMLProps } from "react";
import { SpeechContainerProps } from "src/components/SpeechContainer";
import { InputContainerProps } from "src/components/InputContainer";

export type ConversationContainerProps = {
    SpeechContainer?: FC<SpeechContainerProps>;
    InputContainer?: FC<InputContainerProps>;
} & HTMLProps<HTMLDivElement>;

export type ConversationContainerStyleAttributes = WithCSSProp<{
    $padding?: RequiredCSSProperties["padding"];
}>;