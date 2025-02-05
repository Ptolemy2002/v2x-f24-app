import InputContainerBase from "./Base";
import InputContainerStyled from "./BaseStyled";
import SendButtonBase from "./SendButtonBase";
import SendButtonStyled from "./SendButtonStyled";

export const UnstyledInputContainer = Object.assign(InputContainerBase, {
    SendButton: SendButtonBase,
});

export default Object.assign(InputContainerStyled, {
    SendButton: SendButtonStyled,
});

export const UnstyledSendButton = SendButtonBase;
export const SendButton = SendButtonStyled;

// Export the types and other resources as well.
export * from "./Types";
export * from "./Controllers";