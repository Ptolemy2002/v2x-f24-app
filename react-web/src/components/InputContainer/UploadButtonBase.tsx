import { UploadButtonProps } from "./Types";
import { Button } from "react-bootstrap";
import DefaultUploadIcon from "src/components/icons/UploadIcon";
import DefaultUploadModal from "src/components/modals/UploadModal";
import clsx from "clsx";
import { useState } from "react";

export default function UploadButtonBase({
    className,
    UploadIcon=DefaultUploadIcon,
    UploadModal=DefaultUploadModal,
    onClick,
    ...props
}: UploadButtonProps["functional"]) {
    const [showModal, setShowModal] = useState(false);

    return <>
        <UploadModal
            id="modal-upload"
            show={showModal}
            onHide={() => setShowModal(false)}
        />
        
        <Button
            id="upload-button"
            className={clsx("upload-button", className)}
            as="button"
            aria-label="Upload File"
            onClick={(e) => {
                setShowModal(true);
                onClick?.(e);
            }}
            {...props}
        >
            <UploadIcon />
        </Button>
    </>;
}