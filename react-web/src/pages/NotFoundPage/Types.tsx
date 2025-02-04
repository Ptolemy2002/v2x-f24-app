import { RequiredCSSProperties, StyledComponentPropsWithCSS } from "@ptolemy2002/react-styled-component-utils";
import { HTMLProps } from "react";

export type NotFoundPageProps = StyledComponentPropsWithCSS<HTMLProps<HTMLDivElement>, {
    padding?: RequiredCSSProperties["padding"];
}>;