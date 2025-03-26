import { StyledComponentPropsWithCSS } from "@ptolemy2002/react-styled-component-utils";
import { Override } from "@ptolemy2002/ts-utils";
import { ModalHeaderProps, ModalProps, ModalTitleProps } from "react-bootstrap";
import { ModalStyles } from "styled-components";
import { PropsWithCustomChildren } from "@ptolemy2002/react-utils";
import { ComponentType, HTMLProps, ReactNode } from "react";
import { ModalBodyProps } from "react-bootstrap/esm/ModalBody";
import { AudioPlayerProps } from "src/components/AudioPlayer";
import { ConversationFileEntry } from "shared";

export type UploadModalProps = StyledComponentPropsWithCSS<
    PropsWithCustomChildren<
        Omit<ModalProps, "id"> & {
            titleProps?: Omit<ModalTitleProps, "children">;
            headerProps?: Omit<ModalHeaderProps, "children">;
            bodyProps?: Omit<ModalBodyProps, "children">;
            MediaAttachListItem?: ComponentType<MediaAttachListItemProps["functional"]>;
            AudioPlayer?: ComponentType<AudioPlayerProps["functional"]>;
        },
        {
            title: string | null;
            head: ReactNode;
            body: ReactNode;
        }
    >,
    ModalStyles
>;

export type MediaAttachListItemProps = StyledComponentPropsWithCSS<
    Override<
        HTMLProps<HTMLLIElement>,
        {
            file: ConversationFileEntry,
            AudioPlayer?: ComponentType<AudioPlayerProps["functional"]>;
        }
    >,
    // Used as a placeholder since an empty object is not by eslint
    object
>;