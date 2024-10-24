import clsx from "clsx";
import { Col } from "react-bootstrap";
import { HTMLProps } from "react";
import styled, { css } from "styled-components";
import { BACKGROUND_COLOR, marginX, marginY, paddingX, paddingY, SIDEBAR_ITEM_MARGIN, SIDEBAR_ITEM_PADDING, SIDEBAR_PADDING_X, SIDEBAR_PADDING_Y, TEXT_COLOR } from "src/Style";
import { lighten } from "polished";

export type SidebarProps = {
    colSize?: number;
} & HTMLProps<HTMLUListElement>;

function _Sidebar({className, colSize=1, ...props}: SidebarProps) {
    return (
        // We need to explicitly set the "col" class here so LESS can recognize it as a column.
        // We also need to set the "as" prop after spreading the others to make sure it doesn't get overridden.
        <Col id="sidebar" xs={colSize} className={clsx("col", className)} {...props} as="ul">
            <GenericLinks timeLabel="Today" />
            <GenericLinks timeLabel="Yesterday" start={10} />
            <GenericLinks timeLabel="This Week" start={20} />
            <GenericLinks timeLabel="Earlier This Month" start={30} />
            <GenericLinks timeLabel="This Year" start={40} count={4} />
            <GenericLinks timeLabel="2023" start={45} count={5} />
        </Col>
    );
}

const Sidebar = styled(_Sidebar)`
    // Remove the right border, as it's already on the conversation-container element.
    // This could also be accomplished by removing the left border on the conversation-container.
    border-right: none;

    // Scroll if the content is too tall, but don't show the scrollbar if it's not needed.
    overflow-y: auto;

    ${paddingX(SIDEBAR_PADDING_X)}
    ${paddingY(SIDEBAR_PADDING_Y)}

    list-style: none;
`;
Sidebar.displayName = "Sidebar";
export default Sidebar;

export function baseSidebarItemStyle() {
    return css`
        ${marginX(SIDEBAR_ITEM_MARGIN)}
        ${marginY(0)}
        padding: ${SIDEBAR_ITEM_PADDING};
    `;
}

// TimeLabel will take a text string and an optional screenReaderText string as well as the default properties for a paragraph element.
export type TimeLabelProps = {
    text: string;
    screenReaderText?: string;
} & HTMLProps<HTMLParagraphElement>;

function _TimeLabel({text, screenReaderText="Last Accessed", className, ...props}: TimeLabelProps) {
    return (
        <p className={clsx("time-label", className)} {...props}>
            <span className="visually-hidden">{screenReaderText}</span>
            {text}
        </p>
    );
}

export const TimeLabel = styled(_TimeLabel)`
    text-decoration: underline;
    ${baseSidebarItemStyle()}
`;
TimeLabel.displayName = "TimeLabel";

// ChatLink will take a text string, an href string, and an optional active boolean as well as the default properties for a list item element.
export type ChatLinkProps = {
    text: string;
    href: string;
    active?: boolean;
} & HTMLProps<HTMLLIElement>;

function _ChatLink({text, href, active=false, className, ...props}: ChatLinkProps) {
    return (
        // clsx is just a utility that lets us combine class names. Falsy values do not get added to the class list,
        // which is why "active" is only added when the active prop is true.
        <li className={clsx("chat-link", active && "active", className)} {...props}>
            <a href={href}>{text}</a>
        </li>
    );
}

export const ChatLink = styled(_ChatLink)`
    ${baseSidebarItemStyle()}

    border-radius: 3px;

    &:hover {
        background-color: ${lighten(0.2, BACKGROUND_COLOR)};
    }

    > a {
        // In block display, the a tag will take up the full space of the li tag.
        display: block;
        text-decoration: none;
        color: ${TEXT_COLOR};
    }
`;
ChatLink.displayName = "ChatLink";

export type GenericLinksProps = {
    timeLabel: string;
    count?: number;
    start?: number;
};

// This helps us fill in sample data for the sidebar.
export function GenericLinks({timeLabel, count=10, start=0}: GenericLinksProps) {
    return (
        // This is a fragment, which is a way to return multiple elements without adding an extra div to the DOM.
        <>
            <TimeLabel text={timeLabel} />
            {
                new Array(count).fill(null).map((_, i) => (
                    <ChatLink key={i} text={`Chat ${i + 1 + start}`} href={`#chat-${i + 1 + start}`} />
                ))
            }
        </>
    )
}