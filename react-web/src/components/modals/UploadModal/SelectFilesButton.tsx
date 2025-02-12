import { Button } from "react-bootstrap";
import { SelectFilesButtonProps } from "./Types";
import clsx from "clsx";

export default function UploadModalSelectFilesButtonBase({
    className,
    ...props
}: SelectFilesButtonProps["functional"]) {
    return (
        <Button
            className={clsx("upload-modal-select-files-button", className)}
            {...props}
        >
            Select Files
        </Button>
    );
}