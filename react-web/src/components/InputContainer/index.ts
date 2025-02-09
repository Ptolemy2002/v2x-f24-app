import InputContainerBase from "./Base";
import InputContainerStyled from "./BaseStyled";
import SendButtonBase from "./SendButtonBase";
import SendButtonStyled from "./SendButtonStyled";
import UploadButtonBase from "./UploadButtonBase";
import UploadButtonStyled from "./UploadButtonStyled";

export const UnstyledInputContainer = Object.assign(InputContainerBase, {
    SendButton: SendButtonBase,
    UploadButton: UploadButtonBase,
});

export default Object.assign(InputContainerStyled, {
    SendButton: SendButtonStyled,
    UploadButton: UploadButtonStyled,
});

export const UnstyledSendButton = SendButtonBase;
export const SendButton = SendButtonStyled;

export const UnstyledUploadButton = UploadButtonBase;
export const UploadButton = UploadButtonStyled;

// Export the types and other resources as well.
export * from "./Types";
export * from "./Controllers";