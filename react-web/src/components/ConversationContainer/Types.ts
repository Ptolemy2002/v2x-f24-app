import { RequiredCSSProperties, StyledComponentPropsWithCSS } from "@ptolemy2002/react-styled-component-utils";
import { FC, HTMLProps } from "react";
import { SpeechContainerProps } from "src/components/SpeechContainer";
import { InputContainerProps } from "src/components/InputContainer";

export type ConversationContainerProps = StyledComponentPropsWithCSS<{
    SpeechContainer?: FC<SpeechContainerProps["functional"]>;
    InputContainer?: FC<InputContainerProps["functional"]>;
} & HTMLProps<HTMLDivElement>, {
    padding?: RequiredCSSProperties["padding"];
}>;