import { RequiredCSSProperties, StyledComponentPropsWithCSS } from "@ptolemy2002/react-styled-component-utils";
import { HTMLProps } from "react";

export type ConversationSettingsPageProps = StyledComponentPropsWithCSS<HTMLProps<HTMLDivElement>, {
    padding?: RequiredCSSProperties["padding"];
}>;