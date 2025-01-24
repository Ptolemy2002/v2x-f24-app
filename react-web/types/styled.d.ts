import "styled-components";
import { RequiredCSSProperties } from "@ptolemy2002/react-styled-component-utils";

declare module "styled-components" {
    export interface DefaultTheme {
        backgroundColor: RequiredCSSProperties["backgroundColor"],
        
        textColor: RequiredCSSProperties["color"],
        activeTextColor?: RequiredCSSProperties["color"],

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