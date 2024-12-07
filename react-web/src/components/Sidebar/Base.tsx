import { SidebarProps } from "./Types";
import { Col } from "react-bootstrap";
import DefaultTimeLabel from "./TimeLabelStyled";
import DefaultChatLink from "./ChatLinkStyled";
import clsx from "clsx";
import { useEnv } from "src/Env";

export default function SidebarBase({
    className,
    colSize=1,
    TimeLabel = DefaultTimeLabel,
    ChatLink = DefaultChatLink,
    ...props
}: SidebarProps) {
    const env = useEnv();

    return (
        // We need to explicitly set the "col" class here so LESS can recognize it as a column.
        // We also need to set the "as" prop after spreading the others to make sure it doesn't get overridden.
        <Col id="sidebar" xs={colSize} className={clsx("col", className)} {...props} as="ul">
            {
                env.isDev && <>
                    <TimeLabel text="Development" />
                    <ChatLink text="Demo" id="demo" />
                </>
            }
        </Col>
    );
}