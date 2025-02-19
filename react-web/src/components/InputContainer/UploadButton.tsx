import { FC, useState } from "react";
import { css } from "styled-components";
import StyledButton, { StyledButtonProps } from "src/components/StyledButton";
import { RequiredCSSProperties } from "@ptolemy2002/react-styled-component-utils";
import DefaultUploadModal, { UploadModalProps } from "src/components/modals/UploadModal";
import { MouseEvent } from "react";

export type UploadButtonProps = Omit<StyledButtonProps["all"], "$variant"> & {
    UploadModal?: FC<UploadModalProps["functional"]>;
    $padding?: RequiredCSSProperties["padding"];
};

function UploadButton({
    onClick,
    $padding,
    $css,
    UploadModal = DefaultUploadModal,
    children,
    ...props
}: UploadButtonProps) {
    const [showModal, setShowModal] = useState(false);

    return <>
        <UploadModal
            id="modal-upload"
            show={showModal}
            onHide={() => setShowModal(false)}
        />
        
        <StyledButton
            id="upload-button"
            $variant="upload"
            aria-label="Upload Files"
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
                setShowModal(true);
                onClick?.(e);
            }}
            $css={
                css<StyledButtonProps["all"]>`
                    padding: ${$padding};
                    height: fit-content;
                    margin-top: auto;
                    margin-bottom: auto;
                    ${$css}
                `
            }
            {...props}
        >
            {children}
        </StyledButton>
    </>;
}

export function applySubComponents<
    T extends typeof UploadButton
>(C: T) {
    return Object.assign(C, {
        UploadModal: DefaultUploadModal
    });
}

export default applySubComponents(UploadButton);