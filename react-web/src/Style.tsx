import { Breakpoint, breakpointMap, breakpoints, breakpointToIndex } from "@ptolemy2002/react-bs-media-queries";
import { CSSProperties as _CSSProperties } from "react";
import { css, Interpolation } from "styled-components";

// Remove undefined from CSSProperties, as all these constants are guaranteed to
// exist.
export type RequiredCSSProperties = Required<_CSSProperties>;

export function centerHorizontal() {
    return css`
        margin-left: auto;
        margin-right: auto;
    `;
}

export function centerVertical() {
    return css`
        margin-top: auto;
        margin-bottom: auto;
    `;
}

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

export function alignTop() {
    return css`
        margin-bottom: auto;
    `;
}

export function alignBottom() {
    return css`
        margin-top: auto;
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

export function allLinkPseudo(content: Interpolation<object>) {
    return css`
        &:visited,
        &:hover,
        &:active {
            ${content}
        }
    `;
}

export function minWidth(width: RequiredCSSProperties["width"], content: Interpolation<object>) {
    return css`
        @media (min-width: ${width}) {
            ${content}
        }
    `;
}

export function maxWidth(width: RequiredCSSProperties["width"], content: Interpolation<object>) {
    return css`
        @media (max-width: ${width}) {
            ${content}
        }
    `;
}

export function widthRange(
    minWidth: RequiredCSSProperties["width"],
    maxWidth: RequiredCSSProperties["width"],
    content: Interpolation<object>
) {
    return css`
        @media (min-width: ${minWidth}) and (max-width: ${maxWidth}) {
            ${content}
        }
    `;
}

export function bsBreakpointMin(breakpoint: Breakpoint, content: Interpolation<object>) {
    return minWidth(breakpointMap.get(breakpoint) + "px", content);
}

export function bsBreakpointMax(breakpoint: Breakpoint, content: Interpolation<object>) {
    const breakpointIndex = breakpointToIndex(breakpoint);
    const isLastBreakpoint = breakpointIndex === breakpoints.length - 1;

    return maxWidth(
        isLastBreakpoint ? 
            "100%"
        : 
            breakpointMap.get(breakpoints[breakpointIndex + 1])! - 1 + "px",
        content
    );
}

export function bsBreakpointSame(breakpoint: Breakpoint, content: Interpolation<object>) {
    const breakpointIndex = breakpointToIndex(breakpoint);

    return widthRange(
        breakpointMap.get(breakpoint) + "px",
        breakpointIndex === breakpoints.length - 1 ? "100%" : breakpointMap.get(breakpoints[breakpointIndex + 1])! - 1 + "px",
        content
    );
}