import styled from "styled-components";
import Base, {applySubComponents} from "./Base";
import { SpeechContainerProps } from "./Types";

export default applySubComponents(Object.assign(
    styled(Base).attrs<SpeechContainerProps["style"]>(
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

        &.loading {
            // Center the loading text.
            display: flex;
            justify-content: center;
            align-items: center;
        }

        ${({$css}) => $css}
    `,
    {
        displayName: "styled(SpeechContainer)"
    }
));