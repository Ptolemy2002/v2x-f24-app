import { UploadModalProps } from "./Types";
import { Modal } from "react-bootstrap";

export default function UploadModalBase({
    className,
    children: {
        title="File Upload",
        head=null,
        body=null,
    }={},
    headerProps: {
        closeButton=true,
        ...headerProps
    }={},
    titleProps={},
    bodyProps={},
    ...props
}: UploadModalProps["functional"]) {
    return (
        <Modal
            id="modal-upload"
            className={className}
            {...props}
        >
            <Modal.Header closeButton={closeButton} {...headerProps}>
                <Modal.Title {...titleProps}>
                    {title}
                </Modal.Title>
                {head}
            </Modal.Header>

            <Modal.Body {...bodyProps}>
                {body ?? <>
                    This is where a file upload form would go.
                </>}
            </Modal.Body>
        </Modal>
    )
}