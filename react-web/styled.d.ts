import "styled-components";
import { RequiredCSSProperties } from "@ptolemy2002/react-styled-component-utils";

declare module "styled-components" {
    export interface DefaultTheme {
        backgroundColor: RequiredCSSProperties["backgroundColor"],
        headerBackgroundColor?: RequiredCSSProperties["backgroundColor"],
        
        textColor: RequiredCSSProperties["color"],
        activeTextColor?: RequiredCSSProperties["color"],

        senderColor: RequiredCSSProperties["backgroundColor"],
        senderTextColor?: RequiredCSSProperties["color"],

        recepientColor: RequiredCSSProperties["backgroundColor"],
        recepientTextColor?: RequiredCSSProperties["color"],

        inputColor: RequiredCSSProperties["backgroundColor"],
        inputTextColor?: RequiredCSSProperties["color"],

        timestampColor?: RequiredCSSProperties["color"],

        audioPlayerProgressColor: RequiredCSSProperties["backgroundColor"],
        audioPlayerBackgroundColor: RequiredCSSProperties["backgroundColor"],

        dangerIconColor: RequiredCSSProperties["color"],
        dangerIconBackgroundColor: RequiredCSSProperties["backgroundColor"],

        borderColor: RequiredCSSProperties["borderColor"],
        borderThickness: RequiredCSSProperties["borderWidth"],
        borderStyle: RequiredCSSProperties["borderStyle"],
    }
}