import { TimeLabelProps } from "./Types";
import clsx from "clsx";

export default function TimeLabelBase({text, screenReaderText="Last Accessed", className, ...props}: TimeLabelProps["functional"]) {
    return (
        <p className={clsx("time-label", className)} {...props}>
            <span className="visually-hidden">{screenReaderText}</span>
            {text}
        </p>
    );
}