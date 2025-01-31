import "styled-components";
import { RequiredCSSProperties } from "@ptolemy2002/react-styled-component-utils";

declare module "styled-components" {
    export type ButtonVariant = "conversationEdit";
    export type ButtonStyles = Partial<{
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

    export interface DefaultTheme {
        backgroundColor: RequiredCSSProperties["backgroundColor"],
        
        textColor: RequiredCSSProperties["color"],
        activeTextColor?: RequiredCSSProperties["color"],

        buttons?: Partial<Record<ButtonVariant, ButtonStyles>> & {
            default?: ButtonStyles
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