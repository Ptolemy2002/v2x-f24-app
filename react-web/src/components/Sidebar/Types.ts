import { HTMLProps, FC, MouseEventHandler } from 'react';
import { RequiredCSSProperties, StyledComponentPropsWithCSS } from '@ptolemy2002/react-styled-component-utils';

export type SidebarProps = StyledComponentPropsWithCSS<{
    colSize?: number;
    SidebarLabel?: FC<SidebarLabelProps["all"]>;
    ChatLink?: FC<ChatLinkProps["functional"]>;
    onLinkClick?: MouseEventHandler<HTMLAnchorElement>
} & HTMLProps<HTMLUListElement>, {
    paddingX?: RequiredCSSProperties["paddingLeft"];
    paddingY?: RequiredCSSProperties["paddingTop"];
}>;

// SidebarLabel will take a text string and an optional screenReaderText string as well as the default properties for a paragraph element.
export type SidebarLabelProps = StyledComponentPropsWithCSS<{
    text: string;
    screenReaderText?: string;
} & HTMLProps<HTMLParagraphElement>, {
    underline?: boolean;
    margin?: RequiredCSSProperties["marginLeft"];
    padding?: RequiredCSSProperties["padding"];
}>;

// ChatLink will take a text string, an href string, and an optional active boolean as well as the default properties for a list item element.
export type ChatLinkProps = StyledComponentPropsWithCSS<{
    id: string;
    text: string;
    onClick?: MouseEventHandler<HTMLAnchorElement>;
} & Omit<HTMLProps<HTMLLIElement>, "onClick">, {
    margin?: RequiredCSSProperties["marginLeft"];
    padding?: RequiredCSSProperties["padding"];
}>;