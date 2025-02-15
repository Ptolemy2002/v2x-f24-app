import { HeaderProps } from "./Types";
import { Row } from "react-bootstrap";
import { BSMediaQuery } from "@ptolemy2002/react-bs-media-queries";
import DefaultMenuIcon from "src/components/icons/MenuIcon";
import StyledButton from "../StyledButton";

export default function HeaderBase({
    onMenuClick,
    MenuIcon = DefaultMenuIcon,
    ...props
}: HeaderProps) {
    // The "as" prop allows you to specify the HTML element that the Row component should render as.
    return (
        <Row as="header" {...props}>
            <BSMediaQuery breakpoint="xl" comparison="max">
                <StyledButton
                    $variant="menu"
                    id="menu-button"
                    onClick={onMenuClick}
                >
                    <MenuIcon />
                </StyledButton>
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