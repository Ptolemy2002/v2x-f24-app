import { StyledComponentPropsWithCSS } from "@ptolemy2002/react-styled-component-utils";
import { CSSProperties } from "react";

export type AppProps = StyledComponentPropsWithCSS<{
    className?: string;
}, {
    padding?: CSSProperties["padding"];
    borderThickness?: CSSProperties["borderWidth"];
}>;