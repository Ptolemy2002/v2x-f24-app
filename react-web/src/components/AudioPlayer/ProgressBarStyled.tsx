import ProgressBar from "./ProgressBar";
import styled from "styled-components";
import { centerVertical } from "src/Style";

export default Object.assign(
    styled(ProgressBar)`
        flex-grow: 1;

        // IE10
        background-color: ${({theme}) => theme.audioPlayerBackgroundColor};
        color: ${({theme}) => theme.audioPlayerProgressColor};

        // Chrome and Safari
        &::-webkit-progress-value {
            background-color: ${({theme}) => theme.audioPlayerProgressColor};
        }
        &::-webkit-progress-bar {
            background-color: ${({theme}) => theme.audioPlayerBackgroundColor};
        }

        // Firefox
        &::-moz-progress-bar {
            background-color: ${({theme}) => theme.audioPlayerProgressColor};
        }

        border: none;
        ${centerVertical()}
    `,
    {
        displayName: "ProgressBar"
    }
);