import { UploadModalProps } from "./Types";
import { Modal } from "react-bootstrap";
import FilePicker, { FilePickerRenderFunctionProps } from "@ptolemy2002/react-file-picker";
import { acceptedFileTypeCondition, ZodConversationUploadFilesSchema } from "shared";
import { useCallback, useState } from "react";
import DefaultAudioPlayer, { AudioPlayerProgressBar } from "src/components/AudioPlayer";
import { css } from "styled-components";
import StyledButton from "src/components/StyledButton";
import { interpretZodError } from "@ptolemy2002/regex-utils";
import { Spacer } from "@ptolemy2002/react-utils";

function UploadModalBase({
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
    AudioPlayer=DefaultAudioPlayer,
    ...props
}: UploadModalProps["functional"]) {
    const [error, setError] = useState<string | null>(null);

    const fileValidateHandler = useCallback((files: readonly File[]) => {
        const { success, error } = ZodConversationUploadFilesSchema.safeParse(files);

        if (!success) {
            const interpretedError = interpretZodError(error, {
                prefix: "files"
            });
            if (Array.isArray(interpretedError)) {
                setError(interpretedError.join(", "));
            } else {
                setError(interpretedError);
            }

            return false;
        }

        setError(null);
        return true;
    }, []);

    const fileRenderHandler = useCallback(({ input, files, urls, modifyInputFiles }: FilePickerRenderFunctionProps) => {
        let fileElements;
        if (files.length > 0) {
            fileElements = files.map((file, i) => {
                const url = urls[i]!;
                const [type] = file.type.split("/");

                return (
                    type === "image" ? (
                        <img className={"img-fluid"} src={url} alt={file.name} />
                    ) : type === "audio" ? (
                        <AudioPlayer src={url}
                            ProgressBar={
                                (props) => {
                                    return <AudioPlayerProgressBar
                                        {...props}
                                        $css={css`
                                            // Manually adjusting height until I can figure out why
                                            // any percentage-based height is resulting in 0.
                                            height: 16px;
                                        `}
                                    />
                                }
                            } 
                        />
                    ) : <>
                        <br />
                        <span className="error-text">Unsupported file type: {file.type}</span>
                    </>
                );
        });
        }

        return (
            <>
                <StyledButton
                    $variant="selectFiles"
                    onClick={() => input.click()}
                >
                    Select Files
                </StyledButton>

                <ul className="file-preview-list">
                    {
                        fileElements?.map((e, i) => (
                            <li key={urls[i]}>
                                {files[i]!.name}
                                {e}

                                <Spacer />
                                <StyledButton
                                    $variant="removeFile"
                                    onClick={() => {
                                        modifyInputFiles((files) => {
                                            files.splice(i, 1);
                                        });
                                    }}
                                >
                                    Remove
                                </StyledButton>
                                <Spacer />
                            </li>
                        ))
                    }
                </ul>
                
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

                        defaultChangeBehavior="append"
                        multiple
                        accept={acceptedFileTypeCondition}
                    />

                    {error && <div className="error-text">{error}</div>}
                </>}
            </Modal.Body>
        </Modal>
    )
}

export function applySubComponents<
    T extends typeof UploadModalBase
>(C: T) {
    return Object.assign(C, {
        AudioPlayer: DefaultAudioPlayer
    });
}

export default applySubComponents(UploadModalBase);