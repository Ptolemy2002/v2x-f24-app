import clsx from "clsx";
import { Col } from "react-bootstrap";
import { HTMLProps } from "react";

export type SidebarProps = {
    colSize?: number;
} & HTMLProps<HTMLUListElement>;

export default function Sidebar({className, colSize=1, ...props}: SidebarProps) {
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

// TimeLabel will take a text string and an optional screenReaderText string as well as the default properties for a paragraph element.
export type TimeLabelProps = {
    text: string;
    screenReaderText?: string;
} & HTMLProps<HTMLParagraphElement>;

export function TimeLabel({text, screenReaderText="Last Accessed", className, ...props}: TimeLabelProps) {
    return (
        <p className={clsx("time-label", className)} {...props}>
            <span className="visually-hidden">{screenReaderText}</span>
            {text}
        </p>
    );
}

// ChatLink will take a text string, an href string, and an optional active boolean as well as the default properties for a list item element.
export type ChatLinkProps = {
    text: string;
    href: string;
    active?: boolean;
} & HTMLProps<HTMLLIElement>;

export function ChatLink({text, href, active=false, className, ...props}: ChatLinkProps) {
    return (
        // clsx is just a utility that lets us combine class names. Falsy values do not get added to the class list,
        // which is why "active" is only added when the active prop is true.
        <li className={clsx("chat-link", active && "active", className)} {...props}>
            <a href={href}>{text}</a>
        </li>
    );
}

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