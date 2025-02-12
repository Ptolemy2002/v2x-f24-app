import { RequiredCSSProperties, StyledComponentPropsWithCSS } from "@ptolemy2002/react-styled-component-utils";
import { ButtonProps, ModalHeaderProps, ModalProps, ModalTitleProps } from "react-bootstrap";
import { ButtonStyles, ModalStyles } from "styled-components";
import { PropsWithCustomChildren } from "@ptolemy2002/react-utils";
import { ComponentType, ReactNode } from "react";
import { ModalBodyProps } from "react-bootstrap/esm/ModalBody";
import { AudioPlayerProps } from "src/components/AudioPlayer";

export type UploadModalProps = StyledComponentPropsWithCSS<
    PropsWithCustomChildren<
        Omit<ModalProps, "id"> & {
            titleProps?: Omit<ModalTitleProps, "children">;
            headerProps?: Omit<ModalHeaderProps, "children">;
            bodyProps?: Omit<ModalBodyProps, "children">;
            SelectFilesButton?: ComponentType<SelectFilesButtonProps["functional"]>;
            AudioPlayer?: ComponentType<AudioPlayerProps["functional"]>;
        },
        {
            title: string | null;
            head: ReactNode;
            body: ReactNode;
        }
    >,
    ModalStyles & {
        errorTextColor?: RequiredCSSProperties["color"];
    }
>;

export type SelectFilesButtonProps = StyledComponentPropsWithCSS<
    Omit<ButtonProps, "children">,
    ButtonStyles
>;