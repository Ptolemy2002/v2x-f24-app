import { SidebarLabelProps } from "./Types";
import clsx from "clsx";

function SidebarLabelBase({text, screenReaderText="Last Accessed", className, ...props}: SidebarLabelProps["functional"]) {
    return (
        <p className={clsx("sidebar-label", className)} {...props}>
            <span className="visually-hidden">{screenReaderText}</span>
            {text}
        </p>
    );
}

export function applySubComponents<
    T extends typeof SidebarLabelBase
>(C: T) {
    return Object.assign(C, {});
}

export default applySubComponents(SidebarLabelBase);