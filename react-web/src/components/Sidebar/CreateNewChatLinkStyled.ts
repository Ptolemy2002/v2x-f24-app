import { CreateNewChatLinkProps } from "./Types";
import { baseSidebarItemStyle } from "./Other";
import CreateNewChatLink, {applySubComponents} from "./CreateNewChatLink";
import styled from "styled-components";
import { lighten } from "polished";

export default applySubComponents(Object.assign(
    styled(CreateNewChatLink).attrs<CreateNewChatLinkProps["style"]>(
        (props) => ({
            $margin: props.$margin ?? "0.5em",
            $padding: props.$padding ?? "5px",
            $css: props.$css ?? null,
        })
    )`
        ${({$margin, $padding}) => baseSidebarItemStyle($margin!, $padding!)}

        border-radius: 3px;

        display: flex;
        flex-direction: row;

        &:hover {
            background-color: ${({theme}) => lighten(0.2, theme.backgroundColor)};
        }

        > a {
            // In block display, the a tag will take up the full space of the li tag.
            display: block;
            flex-grow: 1;
            text-decoration: none;
            width: 100%;
            line-height: 100%;

            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;

            color: ${({theme}) => theme.textColor};
            cursor: pointer;
        }

        &.active {
            color: ${({theme}) => theme.activeTextColor ?? theme.textColor};
        }

        ${({$css}) => $css}
    `,
    {
        displayName: "styled(CreateNewChatLink)",
    }
));