import clsx from "clsx";
import { ScreenReaderTextProps } from "./Types";

export default function DangerScreenReaderText({text="failed", origin, className, ...props}: ScreenReaderTextProps) {
    return (
        <span className={clsx("visually-hidden", className)} {...props}>
            {origin === "sender" ? `A message from you has ${text}` : `A message from the recipient has ${text}`}
        </span>
    );
}