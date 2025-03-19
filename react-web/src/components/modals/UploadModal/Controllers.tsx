import { FilePickerRenderFunctionProps } from "@ptolemy2002/react-file-picker";
import { ZodConversationUploadFilesSchema } from "shared";
import { useCallback, useState } from "react";
import { AudioPlayerProgressBar } from "src/components/AudioPlayer";
import { css } from "styled-components";
import { interpretZodError } from "@ptolemy2002/regex-utils";
import { Spacer } from "@ptolemy2002/react-utils";
import StyledButton from "src/components/StyledButton";
import { UploadModalProps } from "./Types";
import { useSuspenseController } from "@ptolemy2002/react-suspense";
import useManualErrorHandling from "@ptolemy2002/react-manual-error-handling";
import ConversationData from "src/data/ConversationData";

export function useModalBodyController(AudioPlayer: Exclude<UploadModalProps["functional"]["AudioPlayer"], undefined>) {
    const [error, setError] = useState<string | null>(null);
    const [conversation] = ConversationData.useContextNonNullable();
    const [{suspend}] = useSuspenseController();
    const {_try} = useManualErrorHandling();

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
                    onClick={() => {
                        input.click()
                    }}
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
                    
                    <br />
                </ul>
                
                <StyledButton
                    $variant="uploadFiles"
                    disabled={files.length === 0}
                    onClick={() => _try(
                        () => suspend(
                            async () => {
                                await conversation.upload(files, files.map((f) => f.name));
                                modifyInputFiles(() => [], "replace")
                            }
                        )
                    )}
                >
                    Upload
                </StyledButton>
            </>
        )
    }, [error]);

    return {
        error,
        fileValidateHandler,
        fileRenderHandler
    };
}