import { HTMLProps, FC } from 'react';
import { RequiredCSSProperties, WithCSSProp } from 'src/Style';

export type SidebarProps = {
    colSize?: number;
    GenericLinks?: FC<GenericLinksProps>;

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
    text: string;
    href: string;
    active?: boolean;
} & HTMLProps<HTMLLIElement>;

export type ChatLinkStyleAttributes = WithCSSProp<{
    $margin?: RequiredCSSProperties["marginLeft"];
    $padding?: RequiredCSSProperties["padding"];
}>;

export type GenericLinksProps = WithCSSProp<{
    timeLabel: string;
    TimeLabel?: FC<TimeLabelProps & TimeLabelStyleAttributes>;
    ChatLink?: FC<ChatLinkProps & ChatLinkStyleAttributes>;
    count?: number;
    start?: number;
}>;