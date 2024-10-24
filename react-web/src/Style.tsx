import { CSSProperties as _CSSProperties } from "react";
import { css } from "styled-components";

// Remove undefined from CSSProperties, as all these constants are guaranteed to
// exist.
type CSSProperties = {
    [K in keyof _CSSProperties]-?: _CSSProperties[K];
};

export const BORDER_THICKNESS: CSSProperties["borderWidth"] = "1px";
export const BORDER_STYLE: CSSProperties["borderStyle"] = "solid";
export const BORDER_COLOR: CSSProperties["borderColor"] = "white";

export const CONTENT_PADDING: CSSProperties["padding"] = "10px";

export const SIDEBAR_PADDING_X: CSSProperties["paddingLeft"] = "10px";
export const SIDEBAR_PADDING_Y: CSSProperties["paddingTop"] = "10px";

export const SIDEBAR_ITEM_PADDING: CSSProperties["padding"] = "5px";
export const SIDEBAR_ITEM_MARGIN: CSSProperties["margin"] = "0.5em";

export const CONVERSATION_PADDING: CSSProperties["padding"] = "10px";
export const SPEECH_CONTAINER_MARGIN_BOTTOM: CSSProperties["marginBottom"] = "20px";
export const SPEECH_CONTAINER_GAP: CSSProperties["gap"] = "10px";

export const SPEECH_BUBBLE_MAX_WIDTH: CSSProperties["maxWidth"] = "75%";
export const SPEECH_BUBBLE_RADIUS: CSSProperties["borderRadius"] = "10px";
export const SPEECH_BUBBLE_PADDING: CSSProperties["padding"] = "10px";

export const SPEECH_BUBBLE_IMG_MAX_WIDTH: CSSProperties["maxWidth"] = "50%";

export const SPEECH_BUBBLE_IMG_BORDER_THICKNESS: CSSProperties["borderWidth"] = "1px";
export const SPEECH_BUBBLE_IMG_BORDER_STYLE: CSSProperties["borderStyle"] = "solid";
export const SPEECH_BUBBLE_IMG_BORDER_COLOR: CSSProperties["borderColor"] = "black";

export const SPEECH_BUBBLE_AUD_WIDTH: CSSProperties["width"] = "50%";

export const AUDIO_PLAYER_GAP: CSSProperties["gap"] = "20px";

export const INPUT_CONTAINER_GAP: CSSProperties["gap"] = "10px";
export const INPUT_RADIUS: CSSProperties["borderRadius"] = "10px";
export const INPUT_PADDING: CSSProperties["padding"] = "5px";
export const INPUT_MIN_HEIGHT: CSSProperties["minHeight"] = "50px";
export const INPUT_MAX_HEIGHT: CSSProperties["maxHeight"] = "50%";

export const SEND_BUTTON_RADIUS: CSSProperties["borderRadius"] = "5px";
export const SEND_BUTTON_PADDING: CSSProperties["padding"] = "5px";

export function alignLeft() {
    return css`
        margin-right: auto;
    `;
}

export function alignRight() {
    return css`
        margin-left: auto;
    `;
}

export function centerVertical() {
    return css`
        margin-top: auto;
        margin-bottom: auto;
    `;
}

export function paddingX(x: CSSProperties["paddingLeft"]) {
    return css`
        padding-left: ${x};
        padding-right: ${x};
    `;
}

export function paddingY(y: CSSProperties["paddingTop"]) {
    return css`
        padding-top: ${y};
        padding-bottom: ${y};
    `;
}

export function marginX(x: CSSProperties["marginLeft"]) {
    return css`
        margin-left: ${x};
        margin-right: ${x};
    `;
}

export function marginY(y: CSSProperties["marginTop"]) {
    return css`
        margin-top: ${y};
        margin-bottom: ${y};
    `;
}