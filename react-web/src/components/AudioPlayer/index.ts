// Since this is index.tsx, importing the folder itself will import this file.
// Don't put any other code in this file, just export the necessary resources.

export {default as UnstyledAudioPlayer} from "./Base";
// The styled component should be the default.
export {default} from "./BaseStyled";

export {default as UnstyledAudioPlayerProgressBar} from "./ProgressBar";
export {default as AudioPlayerProgressBar} from "./ProgressBarStyled";

export {default as AudioMedia} from "./AudioMedia";

// Export the types and other resources as well.
export * from "./Types";
export * from "./Other";
export * from "./Controllers";