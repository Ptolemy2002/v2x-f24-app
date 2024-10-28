// Since this is index.tsx, importing the folder itself will import this file.
// Don't put any other code in this file, just export the necessary resources.
export {default as UnstyledAudioMedia} from "./Base";
// The styled component should be the default.
export {default as default} from "./BaseStyled";

export {default as UnstyledProgressBar} from "./ProgressBar";
export {default as ProgressBar} from "./ProgressBarStyled";

export {default as AudioMedia} from "./AudioMedia";

// Export the types and other resources as well.
export * from "./Types";
export * from "./Other";