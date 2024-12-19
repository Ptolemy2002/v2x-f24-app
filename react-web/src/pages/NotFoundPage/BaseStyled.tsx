import styled from "styled-components";
import { NotFoundPageProps } from "./Types";
import Base from "./Base";

export default Object.assign(
    styled(Base).attrs<NotFoundPageProps["style"]>(
        (props) => ({
            $padding: props.$padding ?? "10px",
            $css: props.$css ?? null,
        })
    )`
        display: flex;
        flex-direction: column;
        padding: ${({$padding}) => $padding};
        
        // Center the text vertically and horizontally
        justify-content: center;
        align-items: center;

        > p {
            text-align: center;
        }

        ${({$css}) => $css}
    `,
    {
        displayName: "styled(NotFoundPage)",
    }
);