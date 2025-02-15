// Since this is index.tsx, importing the folder itself will import this file.
// Don't put any other code in this file, just export the necessary resources.
import _UnstyledSidebar from "./Base";
import _Sidebar from "./BaseStyled";
import _UnstyledSidebarLabel from "./SidebarLabel";
import _SidebarLabel from "./SidebarLabelStyled";
import _UnstyledChatLink from "./ChatLink";
import _ChatLink from "./ChatLinkStyled";

export const UnstyledSidebar = Object.assign(_UnstyledSidebar, {
    SidebarLabel: _UnstyledSidebarLabel,
    ChatLink: _UnstyledChatLink,
});
export default Object.assign(_Sidebar, {
    SidebarLabel: _SidebarLabel,
    ChatLink: _ChatLink,
});

export {default as UnstyledSidebarLabel} from "./SidebarLabel";
export {default as SidebarLabel} from "./SidebarLabelStyled";

export {default as UnstyledChatLink} from "./ChatLink";
export {default as ChatLink} from "./ChatLinkStyled";

// Export the types and other resources.
export * from "./Types";
export * from "./Other";