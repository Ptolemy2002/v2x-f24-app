import { RequiredCSSProperties, StyledComponentPropsWithCSS } from "@ptolemy2002/react-styled-component-utils";
import { Override } from "@ptolemy2002/ts-utils";
import { ComponentType, HTMLProps } from "react";
import { FormProps } from "react-bootstrap";

export type ConversationSettingsPageProps = StyledComponentPropsWithCSS<
        Override<HTMLProps<HTMLDivElement>, {
            ConversationSettingsPageBody: ComponentType<ConversationSettingsPageBodyProps["functional"]>;
        }
    >, {
        padding?: RequiredCSSProperties["padding"];
    }>
;

export type ConversationSettingsPageBodyProps = StyledComponentPropsWithCSS<FormProps, unknown>;

export type ConversationSettingsFormInputs = {
    name: string;
};