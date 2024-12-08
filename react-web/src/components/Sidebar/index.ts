// Since this is index.tsx, importing the folder itself will import this file.
// Don't put any other code in this file, just export the necessary resources.
import _UnstyledSidebar from "./Base";
import _Sidebar from "./BaseStyled";
import _UnstyledTimeLabel from "./TimeLabel";
import _TimeLabel from "./TimeLabelStyled";
import _UnstyledChatLink from "./ChatLink";
import _ChatLink from "./ChatLinkStyled";

export const UnstyledSidebar = Object.assign(_UnstyledSidebar, {
    TimeLabel: _UnstyledTimeLabel,
    ChatLink: _UnstyledChatLink,
});
export default Object.assign(_Sidebar, {
    TimeLabel: _TimeLabel,
    ChatLink: _ChatLink,
});

export {default as UnstyledTimeLabel} from "./TimeLabel";
export {default as TimeLabel} from "./TimeLabelStyled";

export {default as UnstyledChatLink} from "./ChatLink";
export {default as ChatLink} from "./ChatLinkStyled";

// Export the types and other resources.
export * from "./Types";
export * from "./Other";