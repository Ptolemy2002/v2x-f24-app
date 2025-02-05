import { SendButtonProps } from "./Types";
import { Button } from "react-bootstrap";
import DefaultRightArrowIcon from "../icons/RightArrowIcon";
import clsx from "clsx";

export default function SendButtonBase({
    className,
    RightArrowIcon=DefaultRightArrowIcon,
    ...props
}: SendButtonProps["functional"]) {
    return (
        <Button
            id="send-button"
            className={clsx("send-button", className)}
            as="button"
            aria-label="Send Message"
            {...props}
        >
            <RightArrowIcon />
        </Button>
    );
}