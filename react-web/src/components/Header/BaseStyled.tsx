import Base from "./Base";
import styled from "styled-components";
import { important } from "polished";

export default Object.assign(
    styled(Base)`
        display: flex;
        flex-direction: row;
        background-color: ${({theme}) => theme.headerBackgroundColor};

        > * {
            flex-grow: 1;
            // important is used to override the default Bootstrap styles
            ${important({width: "fit-content"})}

            margin: 0;

            // Vertically center the span
            display: flex;
            align-items: center;
        }

        > #menu-button {
            flex-grow: 0;
            width: 2em;
            // important is used to override the default Bootstrap styles
            ${({theme}) => important({backgroundColor: theme.senderColor})}
            border: none;
        }
    `,
    {
        displayName: "Header"
    }
);