import clsx from "clsx";
import { ScreenReaderTextProps } from "./Types";

export default function({text="said", origin, className, ...props}: ScreenReaderTextProps) {
    return (
        <span className={clsx("visually-hidden", className)} {...props}>
            {origin === "sender" ? `You ${text}` : `Recipient ${text}`}
        </span>
    );
}