import { SidebarLabelProps } from "./Types";
import clsx from "clsx";

export default function SidebarLabelBase({text, screenReaderText="Last Accessed", className, ...props}: SidebarLabelProps["functional"]) {
    return (
        <p className={clsx("time-label", className)} {...props}>
            <span className="visually-hidden">{screenReaderText}</span>
            {text}
        </p>
    );
}