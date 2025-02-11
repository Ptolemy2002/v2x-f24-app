import { UploadModalProps } from "./Types";
import { Button, Modal } from "react-bootstrap";
import FilePicker, { FilePickerRenderFunctionProps } from "@ptolemy2002/react-file-picker";
import { valueConditionMatches } from "@ptolemy2002/ts-utils";
import { acceptedFileTypeCondition } from "./Other";
import { useCallback, useState } from "react";
import AudioPlayer from "src/components/AudioPlayer";

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
    const [error, setError] = useState<string | null>(null);

    const fileValidateHandler = useCallback((files: readonly File[]) => {
        if (files.length === 0) {
            setError("No files selected");
            return false;
        } else if (files.some((file) => !valueConditionMatches(file.type, acceptedFileTypeCondition))) {
            setError("Invalid file type for one or more files");
            return false;
        }

        setError(null);
        return true;
    }, []);

    const fileRenderHandler = useCallback(({ input, files, urls }: FilePickerRenderFunctionProps) => {
        let fileElements;
        if (!error && files.length > 0) {
            fileElements = files.map((file, i) => {
                const url = urls[i];
                const [type] = file.type.split("/");

                return type === "image" ? (
                    <img key={url} className={"img-fluid"} src={url} alt={file.name} />
                ) : (
                    <AudioPlayer key={url} src={url} />
                );
            });
        }

        return (
            <>
                <Button onClick={() => input.click()}>
                    Select File
                </Button>

                {
                    fileElements
                }
            </>
        )
    }, [error]);

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
                    <FilePicker
                        generateURLs={true}
                        validateFiles={fileValidateHandler}
                        render={fileRenderHandler}

                        multiple
                        accept={acceptedFileTypeCondition}
                    />

                    {error && <div className="error-text">{error}</div>}
                </>}
            </Modal.Body>
        </Modal>
    )
}