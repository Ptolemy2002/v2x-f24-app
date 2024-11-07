import { SidebarProps } from "./Types";
import { Col } from "react-bootstrap";
import DefaultGenericLinks from "./GenericLinks";
import clsx from "clsx";

export default function Sidebar({className, colSize=1, GenericLinks = DefaultGenericLinks, ...props}: SidebarProps) {
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