import "styled-components";
import { RequiredCSSProperties } from "@ptolemy2002/react-styled-component-utils";

declare module "styled-components" {
    export type AlertVariant = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";
    export type AlertStyles = Partial<{
        backgroundColor: RequiredCSSProperties["backgroundColor"],
        textColor: RequiredCSSProperties["color"],
        borderColor: RequiredCSSProperties["borderColor"],
        linkColor: RequiredCSSProperties["color"]
    }>;

    export type ButtonVariant = 
        "menu" | "conversationTitleEdit" | "send" | "pausePlay"
        | "conversationSettingsSave" | "upload" | "selectFiles"
        | "removeFile"
    ;
    export type ButtonStyles = Partial<{
        radius: RequiredCSSProperties["borderRadius"],

        borderStyle: RequiredCSSProperties["borderStyle"],
        borderWidth: RequiredCSSProperties["borderWidth"],

        borderColor: RequiredCSSProperties["borderColor"],
        hoverBorderColor: RequiredCSSProperties["borderColor"],
        activeBorderColor: RequiredCSSProperties["borderColor"],
        disabledBorderColor: RequiredCSSProperties["borderColor"],

        backgroundColor: RequiredCSSProperties["backgroundColor"],
        activeBackgroundColor: RequiredCSSProperties["backgroundColor"],
        hoverBackgroundColor: RequiredCSSProperties["backgroundColor"],
        disabledBackgroundColor: RequiredCSSProperties["backgroundColor"],

        textColor: RequiredCSSProperties["color"],
        activeTextColor: RequiredCSSProperties["color"],
        hoverTextColor: RequiredCSSProperties["color"],
        disabledTextColor: RequiredCSSProperties["color"],
    }>;

    export type ModalVariant = "upload";
    export type ModalStyles = Partial<{
        zIndex: RequiredCSSProperties["zIndex"],

        textColor: RequiredCSSProperties["color"],
        backgroundColor: RequiredCSSProperties["backgroundColor"],

        borderStyle: RequiredCSSProperties["borderStyle"],
        borderColor: RequiredCSSProperties["borderColor"],
        borderWidth: RequiredCSSProperties["borderWidth"],
        radius: RequiredCSSProperties["borderRadius"],

        whiteCloseButton: boolean,

        header?: {
            borderColor?: RequiredCSSProperties["borderColor"],
            borderWidth?: RequiredCSSProperties["borderWidth"],
        }
    }>;

    export interface DefaultTheme {
        backgroundColor: RequiredCSSProperties["backgroundColor"],
        
        textColor: RequiredCSSProperties["color"],
        errorTextColor: RequiredCSSProperties["color"],
        activeTextColor?: RequiredCSSProperties["color"],

        buttons?: Partial<Record<ButtonVariant, ButtonStyles>> & {
            default?: ButtonStyles
        },

        alerts?: Partial<Record<AlertVariant, AlertStyles>> & {
            default?: AlertStyles
        },

        modals?: Partial<Record<ModalVariant, ModalStyles>> & {
            default?: ModalStyles
        },

        header?: {
            backgroundColor?: RequiredCSSProperties["backgroundColor"]
        },

        timestamp?: {
            color?: RequiredCSSProperties["color"]
        },

        sender: {
            color: RequiredCSSProperties["backgroundColor"],
            textColor?: RequiredCSSProperties["color"]
        },

        recepient: {
            color: RequiredCSSProperties["backgroundColor"],
            textColor?: RequiredCSSProperties["color"]
        },

        input: {
            color: RequiredCSSProperties["backgroundColor"],
            textColor?: RequiredCSSProperties["color"]
        },

        audioPlayer: {
            progressColor: RequiredCSSProperties["backgroundColor"],
            backgroundColor: RequiredCSSProperties["backgroundColor"]
        },

        icons: {
            danger: {
                color: RequiredCSSProperties["color"],
                backgroundColor: RequiredCSSProperties["backgroundColor"]
            }
        },

        border: {
            color: RequiredCSSProperties["borderColor"],
            thickness: RequiredCSSProperties["borderWidth"],
            style: RequiredCSSProperties["borderStyle"]
        }
    }
}