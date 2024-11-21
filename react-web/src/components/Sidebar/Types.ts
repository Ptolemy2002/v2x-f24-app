import { HTMLProps, FC } from 'react';
import { RequiredCSSProperties, WithCSSProp } from '@ptolemy2002/react-styled-component-utils';

export type SidebarProps = {
    colSize?: number;
    TimeLabel?: FC<TimeLabelProps & TimeLabelStyleAttributes>;
    ChatLink?: FC<ChatLinkProps & ChatLinkStyleAttributes>;
} & HTMLProps<HTMLUListElement>;

export type SidebarStyleAttributes = WithCSSProp<{
    $paddingX?: RequiredCSSProperties["paddingLeft"];
    $paddingY?: RequiredCSSProperties["paddingTop"];
}>;

// TimeLabel will take a text string and an optional screenReaderText string as well as the default properties for a paragraph element.
export type TimeLabelProps = {
    text: string;
    screenReaderText?: string;
} & HTMLProps<HTMLParagraphElement>;

export type TimeLabelStyleAttributes = WithCSSProp<{
    $margin?: RequiredCSSProperties["marginLeft"];
    $padding?: RequiredCSSProperties["padding"];
}>;

// ChatLink will take a text string, an href string, and an optional active boolean as well as the default properties for a list item element.
export type ChatLinkProps = {
    id: string;
    text: string;
} & HTMLProps<HTMLLIElement>;

export type ChatLinkStyleAttributes = WithCSSProp<{
    $margin?: RequiredCSSProperties["marginLeft"];
    $padding?: RequiredCSSProperties["padding"];
}>;