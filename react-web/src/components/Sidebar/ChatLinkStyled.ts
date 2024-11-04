import { ChatLinkStyleAttributes } from "./Types";
import { baseSidebarItemStyle } from "./Other";
import ChatLink from "./ChatLink";
import styled from "styled-components";
import { lighten } from "polished";

export default Object.assign(
    styled(ChatLink).attrs<ChatLinkStyleAttributes>(
        (props) => ({
            $margin: props.$margin ?? "0.5em",
            $padding: props.$padding ?? "5px",
            $css: props.$css ?? null,
        })
    )`
        ${({$margin, $padding}) => baseSidebarItemStyle($margin!, $padding!)}

        border-radius: 3px;

        &:hover {
            background-color: ${({theme}) => lighten(0.2, theme.backgroundColor)};
        }

        > a {
            // In block display, the a tag will take up the full space of the li tag.
            display: block;
            text-decoration: none;
            color: ${({theme}) => theme.textColor};
        }

        ${({$css}) => $css}
    `,
    {
        displayName: "ChatLink",
    }
);