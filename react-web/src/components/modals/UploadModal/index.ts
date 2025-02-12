import UploadModalBase from "./Base";
import UploadModalStyled from "./BaseStyled";
import SelectFilesButtonBase from "./SelectFilesButton";
import SelectFilesButtonStyled from "./SelectFilesButtonStyled";

export const UnstyledUploadModal = Object.assign(UploadModalBase, {
    SelectFilesButton: SelectFilesButtonBase,
});

export default Object.assign(UploadModalStyled, {
    SelectFilesButton: SelectFilesButtonStyled,
});

export const UnstyledSelectFilesButton = SelectFilesButtonBase;
export const SelectFilesButton = SelectFilesButtonStyled;

export * from "./Types";
export * from "./Other";