import { SidebarProps } from "./Types";
import Base from "./Base";
import { paddingX, paddingY } from "@ptolemy2002/react-styled-component-utils";
import styled from "styled-components";

export default Object.assign(
    styled(Base).attrs<SidebarProps["style"]>(
        (props) => ({
            $paddingX: props.$paddingX ?? "10px",
            $paddingY: props.$paddingY ?? "10px",
            $css: props.$css ?? null,
        })
    )`
        // Remove the right border, as it's already on the conversation-container element.
        // This could also be accomplished by removing the left border on the conversation-container.
        border-right: none;
    
        // Scroll if the content is too tall, but don't show the scrollbar if it's not needed.
        overflow-y: auto;
    
        ${({$paddingX}) => paddingX($paddingX!)}
        ${({$paddingY}) => paddingY($paddingY!)}

        height: 100%;
    
        list-style: none;

        ${({$css}) => $css}
    `,
    {
        displayName: "styled(Sidebar)",
    }
);