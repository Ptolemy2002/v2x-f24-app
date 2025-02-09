import { StyledComponentPropsWithCSS } from "@ptolemy2002/react-styled-component-utils";
import { ModalHeaderProps, ModalProps, ModalTitleProps } from "react-bootstrap";
import { ModalStyles } from "styled-components";
import { PropsWithCustomChildren } from "@ptolemy2002/react-utils";
import { ReactNode } from "react";
import { ModalBodyProps } from "react-bootstrap/esm/ModalBody";

export type UploadModalProps = StyledComponentPropsWithCSS<
    PropsWithCustomChildren<
        Omit<ModalProps, "id"> & {
            titleProps?: ModalTitleProps;
            headerProps?: ModalHeaderProps;
            bodyProps?: ModalBodyProps;
        },
        {
            title: string | null;
            head: ReactNode;
            body: ReactNode;
        }
    >,
    ModalStyles
>;