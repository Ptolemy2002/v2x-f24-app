import { CSSProperties, FC } from "react";
import { HeaderProps } from "src/components/Header";
import { SidebarProps, SidebarStyleAttributes } from "src/components/Sidebar";

export type AppProps = {
    className?: string;
    Sidebar?: FC<SidebarProps & SidebarStyleAttributes>;
    Header?: FC<HeaderProps>;
}

export type AppStyleAttributes = {
    $padding?: CSSProperties["padding"];
    $borderThickness?: CSSProperties["borderWidth"];
}