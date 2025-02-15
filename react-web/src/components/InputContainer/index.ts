import InputContainerBase from "./Base";
import InputContainerStyled from "./BaseStyled";
import SendButton from "./SendButton";
import UploadButton from "./UploadButton";

export const UnstyledInputContainer = Object.assign(InputContainerBase, {
    SendButton, UploadButton
});

export default Object.assign(InputContainerStyled, {
    SendButton, UploadButton
});

export { default as SendButton } from "./SendButton";
export { default as UploadButton } from "./UploadButton";

// Export the types and other resources as well.
export * from "./Types";
export * from "./Controllers";