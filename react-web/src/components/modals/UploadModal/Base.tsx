import { UploadModalProps } from "./Types";
import { Modal } from "react-bootstrap";
import FilePicker from "@ptolemy2002/react-file-picker";
import { acceptedFileTypeCondition } from "shared";
import DefaultAudioPlayer from "src/components/AudioPlayer";
import { useModalBodyController } from "./Controllers";
import { Override } from "@ptolemy2002/ts-utils";
import { SuspenseBoundary } from "@ptolemy2002/react-suspense";
import { ErrorBoundary } from "react-error-boundary";
import { ReactNode } from "react";
import getEnv from "src/Env";
import ImageEntryDisplay from "src/components/ImageEntryDisplay";

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

            <ErrorBoundary fallback={<p>An error occured.</p>}>
                <SuspenseBoundary fallback={<p>Loading...</p>}>
                    <UploadModalInternalBody {...{ bodyProps, AudioPlayer, children: { body } }} />
                </SuspenseBoundary>
            </ErrorBoundary>
        </Modal>
    );
}

type UploadModalInternalBodyProps = Override<
    Pick<UploadModalProps["functional"], "AudioPlayer" | "bodyProps" | "children">,
    {
        children?: Pick<
            Exclude<
                UploadModalProps["functional"]["children"], undefined
            >, "body"
        >
    }
>;

function UploadModalInternalBody(
    {
        bodyProps={},
        AudioPlayer=DefaultAudioPlayer,
        children: {
            body=null
        }={}
    }: UploadModalInternalBodyProps
) {
    const env = getEnv();
    const {
        conversation,
        error,
        fileValidateHandler,
        fileRenderHandler
    } = useModalBodyController(AudioPlayer);

    return (
        <Modal.Body {...bodyProps}>
            {body ?? <>
                <h4>Existing Files</h4>
                <ul className="file-list">
                    {
                        Object.keys(conversation.files).map((fileId) => {
                            const file = conversation.files[fileId]!;

                            // Skip placeholder files
                            if (["placeholder-image", "placeholder-audio"].includes(file.key)) return null;

                            let fileElement: ReactNode = <span className="error-text">Unsupported file type: {file.type}</span>;

                            if (file.type === "image") {
                                fileElement = <ImageEntryDisplay file={file} />;
                            } else if (file.type === "audio") {
                                fileElement = (
                                    <AudioPlayer
                                        src={file.url.replace("$target", env.apiUrl)}
                                        alt={file.alt}
                                    />
                                )
                            }

                            return (
                                <li key={fileId} className="file-display">
                                    {file.alt ?? "[No Description Provided]"}
                                    <br />
                                    {fileElement}
                                </li>
                            );
                        })
                    }
                </ul>
                
                <br />

                <h4>Upload New Files</h4>
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