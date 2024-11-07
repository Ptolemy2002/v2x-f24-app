import { TimeLabelStyleAttributes } from "./Types";
import TimeLabel from "./TimeLabel";
import { baseSidebarItemStyle } from "./Other";
import styled from "styled-components";

export default Object.assign(styled(TimeLabel).attrs<TimeLabelStyleAttributes>(
        (props) => ({
            $margin: props.$margin ?? "0.5em",
            $padding: props.$padding ?? "5px",
            $css: props.$css ?? null,
        })
    )`
        text-decoration: underline;
        ${({$margin, $padding}) => baseSidebarItemStyle($margin!, $padding!)}

        ${({$css}) => $css}
    `, 
    {
        displayName: "styled(TimeLabel)",
    }
);