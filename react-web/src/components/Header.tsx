import { Button, Row } from "react-bootstrap";
import { BSMediaQuery } from "@ptolemy2002/react-bs-media-queries";
import MenuIcon from "src/components/icons/MenuIcon";
import styled from "styled-components";
import { important } from "polished";

export type HeaderProps = {
    onMenuClick?: () => void;
} & React.HTMLAttributes<HTMLElement>;

function _Header({ onMenuClick, ...props }: HeaderProps) {
    // The "as" prop allows you to specify the HTML element that the Row component should render as.
    return (
        <Row as="header" {...props}>
            <BSMediaQuery breakpoint="xl" comparison="max">
                <Button id="menu-button" onClick={onMenuClick}>
                    <MenuIcon />
                </Button>
            </BSMediaQuery>

            <BSMediaQuery breakpoint="xs" comparison="max">
                <p><span>App Layout Prototype</span></p>
            </BSMediaQuery>

            <BSMediaQuery breakpoint="sm" comparison="min">
                <h4><span>App Layout Prototype</span></h4>
            </BSMediaQuery>
        </Row>
    );
}

const Header = styled(_Header)`
    display: flex;
    flex-direction: row;
    background-color: ${({theme}) => theme.headerBackgroundColor};

    > * {
        flex-grow: 1;
        // important is used to override the default Bootstrap styles
        ${important({width: "fit-content"})}

        margin: 0;

        // Vertically center the span
        display: flex;
        align-items: center;
    }

    > #menu-button {
        flex-grow: 0;
        width: 2em;
        // important is used to override the default Bootstrap styles
        ${({theme}) => important({backgroundColor: theme.senderColor})}
        border: none;
    }
`;
Header.displayName = "Header";
export default Header;