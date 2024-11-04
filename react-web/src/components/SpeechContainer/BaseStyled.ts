import styled from "styled-components";
import Base from "./Base";
import { SpeechContainerStyleAttributes } from "./Types";

export default Object.assign(
    styled(Base).attrs<SpeechContainerStyleAttributes>(
        (props) => ({
            $marginBottom: props.$marginBottom ?? "20px",
            $gap: props.$gap ?? "10px",
            $css: props.$css ?? null,
        })
    )`
        // Scroll if the content is too tall, but don't show the scrollbar if it's not needed.
        overflow-y: auto;
        flex-grow: 1;
        margin-bottom: ${({$marginBottom}) => $marginBottom};

        display: flex;
        flex-direction: column;
        gap: ${({$gap}) => $gap};

        ${({$css}) => $css}
    `,
    {
        displayName: "SpeechContainer"
    }
);