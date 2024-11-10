import { RequiredCSSProperties, marginX, marginY } from "@ptolemy2002/react-styled-component-utils";
import { css } from "styled-components";

export function baseSidebarItemStyle(margin: RequiredCSSProperties["marginLeft"], padding: RequiredCSSProperties["padding"]) {
    return css`
        ${marginX(margin)}
        ${marginY(0)}
        padding: ${padding};
    `;
}