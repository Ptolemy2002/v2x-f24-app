import { SidebarLabelProps } from "./Types";
import SidebarLabel from "./SidebarLabel";
import { baseSidebarItemStyle } from "./Other";
import styled from "styled-components";

export default Object.assign(styled(SidebarLabel).attrs<SidebarLabelProps["style"]>(
        (props) => ({
            $underline: props.$underline ?? true,
            $margin: props.$margin ?? "0.5em",
            $padding: props.$padding ?? "5px",
            $css: props.$css ?? null,
        })
    )`
        text-decoration: ${({$underline}) => $underline ? "underline" : "none"};
        ${({$margin, $padding}) => baseSidebarItemStyle($margin!, $padding!)}

        ${({$css}) => $css}
    `, 
    {
        displayName: "styled(SidebarLabel)",
    }
);