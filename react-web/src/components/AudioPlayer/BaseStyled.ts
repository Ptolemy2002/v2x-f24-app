import Base from "./Base";
import { AudioPlayerStyleAttributes } from "./Types";
import styled from "styled-components";

export default Object.assign(
    styled(Base).attrs<AudioPlayerStyleAttributes>(
        (props) => ({
            $gap: props.$gap ?? "20px",
            $css: props.$css ?? null,
        })
    )`
        display: flex;
        flex-direction: row;
        gap: ${({$gap}) => $gap};
        height: 100%;
        width: 100%;

        > .progress-label {
            margin-top: auto;
            margin-bottom: auto;
        }
        
        ${({$css}) => $css}
    `,
    {
        displayName: "styled(AudioPlayer)",
    }
);