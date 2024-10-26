import { Breakpoint, breakpointMap, breakpoints, breakpointToIndex } from "@ptolemy2002/react-bs-media-queries";
import { CSSProperties as _CSSProperties } from "react";
import { css, Interpolation } from "styled-components";

// Remove undefined from CSSProperties, as all these constants are guaranteed to
// exist.
export type RequiredCSSProperties = Required<_CSSProperties>;

export function alignLeft() {
    return css`
        margin-right: auto;
    `;
}

export function alignRight() {
    return css`
        margin-left: auto;
    `;
}

export function centerVertical() {
    return css`
        margin-top: auto;
        margin-bottom: auto;
    `;
}

export function paddingX(x: RequiredCSSProperties["paddingLeft"]) {
    return css`
        padding-left: ${x};
        padding-right: ${x};
    `;
}

export function paddingY(y: RequiredCSSProperties["paddingTop"]) {
    return css`
        padding-top: ${y};
        padding-bottom: ${y};
    `;
}

export function marginX(x: RequiredCSSProperties["marginLeft"]) {
    return css`
        margin-left: ${x};
        margin-right: ${x};
    `;
}

export function marginY(y: RequiredCSSProperties["marginTop"]) {
    return css`
        margin-top: ${y};
        margin-bottom: ${y};
    `;
}

export function bsBreakpointMin(breakpoint: Breakpoint, content: Interpolation<object>) {
    return css`
        @media (min-width: ${breakpointMap.get(breakpoint)}px) {
            ${content}
        }
    `;

}

export function bsBreakpointMax(breakpoint: Breakpoint, content: Interpolation<object>) {
    const breakpointIndex = breakpointToIndex(breakpoint);
    const isLastBreakpoint = breakpointIndex === breakpoints.length - 1;
    return css`
        @media (max-width: ${isLastBreakpoint ? "100%" : breakpointMap.get(breakpoints[breakpointIndex + 1])! - 1 + "px"}) {
            ${content}
        }
    `;

}

export function bsBreakpointSame(breakpoint: Breakpoint, content: Interpolation<object>) {
    const breakpointIndex = breakpointToIndex(breakpoint);
    return css`
        @media (
            min-width: ${breakpointMap.get(breakpoint)}px
        ) and (
            max-width: ${breakpointIndex === breakpoints.length - 1 ? "100%" : breakpointMap.get(breakpoints[breakpointIndex + 1])! - 1 + "px"}
        ) {
            ${content}
        }
    `;

}