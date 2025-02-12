import { RequiredCSSProperties, StyledComponentPropsWithCSS } from "@ptolemy2002/react-styled-component-utils";
import { Override } from "@ptolemy2002/ts-utils";
import { ComponentType, HTMLProps } from "react";
import { ButtonProps, FormProps } from "react-bootstrap";
import { ButtonStyles } from "styled-components";

export type ConversationSettingsPageProps = StyledComponentPropsWithCSS<
        Override<HTMLProps<HTMLDivElement>, {
            Body?: ComponentType<ConversationSettingsPageBodyProps["functional"]>;
        }
    >, {
        padding?: RequiredCSSProperties["padding"];
    }>
;

export type ConversationSettingsPageBodyProps = StyledComponentPropsWithCSS<FormProps & {
    SaveButton?: ComponentType<ConversationSettingsSaveButtonProps["functional"]>;
}, {
    formGroupGap?: RequiredCSSProperties["gap"];
    marginBottom?: RequiredCSSProperties["marginBottom"];
}>;

export type ConversationSettingsSaveButtonProps = StyledComponentPropsWithCSS<
    Omit<ButtonProps, "children">,
    ButtonStyles
>;

export type ConversationSettingsFormInputs = {
    name: string;
};