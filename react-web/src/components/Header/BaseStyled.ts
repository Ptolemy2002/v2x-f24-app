import Base from "./Base";
import styled from "styled-components";
import { important } from "polished";
import { WithCSSProp } from "@ptolemy2002/react-styled-component-utils";

export default Object.assign(
    styled(Base).attrs<WithCSSProp>(
        (props) => ({
            $css: props.$css ?? null
        })
    )`
        display: flex;
        flex-direction: row;
        background-color: ${({theme}) => theme.header?.backgroundColor ?? theme.backgroundColor};

        > * {
            flex-grow: 1;
            // important is used to override the default Bootstrap styles
            ${important({width: "fit-content"})}

            margin: 0;

            // Vertically center the span within the header element
            display: flex;
            align-items: center;
        }

        > #menu-button {
            flex-grow: 0;
            width: 2em;
            // important is used to override the default Bootstrap styles
            ${({theme}) => important({backgroundColor: theme.sender.color})}
            border: none;
        }

        ${({$css}) => $css}
    `,
    {
        displayName: "styled(Header)"
    }
);