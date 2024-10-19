import { Button, Row } from "react-bootstrap";
import { BSMediaQuery } from "@ptolemy2002/react-bs-media-queries";

export type HeaderProps = {
    onMenuClick?: () => void;
} & React.HTMLAttributes<HTMLElement>;

export default function Header({ onMenuClick, ...props }: HeaderProps) {
    // The "as" prop allows you to specify the HTML element that the Row component should render as.
    return (
        <Row as="header" {...props}>
            <BSMediaQuery breakpoint="xl" comparison="max">
                <Button variant="primary" id="menu-button" onClick={onMenuClick}>
                    Menu
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