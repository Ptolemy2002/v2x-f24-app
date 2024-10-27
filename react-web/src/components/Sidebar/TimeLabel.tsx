import { TimeLabelProps } from "./Types";
import clsx from "clsx";

export default function ({text, screenReaderText="Last Accessed", className, ...props}: TimeLabelProps) {
    return (
        <p className={clsx("time-label", className)} {...props}>
            <span className="visually-hidden">{screenReaderText}</span>
            {text}
        </p>
    );
}