import { CSSProperties } from "react";

export type AppProps = {
    className?: string;
}

export type AppStyleAttributes = {
    $padding?: CSSProperties["padding"];
    $borderThickness?: CSSProperties["borderWidth"];
}