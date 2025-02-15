// Since this is index.tsx, importing the folder itself will import this file.
// Don't put any other code in this file, just export the necessary resources.
// The styled component should be the default.
import UnstyledAudioPlayerProgressBar from "./ProgressBar";
import AudioPlayerProgressBar from "./ProgressBarStyled";
import AudioMedia from "./AudioMedia";
import _UnstyledAudioPlayer from "./Base";
import AudioPlayer from "./BaseStyled";

export default Object.assign(AudioPlayer, {
    AudioPlayerProgressBar: AudioPlayerProgressBar,
    AudioMedia: AudioMedia
});

export const UnstyledAudioPlayer = Object.assign(_UnstyledAudioPlayer, {
    AudioPlayerProgressBar: UnstyledAudioPlayerProgressBar,
    AudioMedia: AudioMedia
});

export {default as UnstyledAudioPlayerProgressBar} from "./ProgressBar";
export {default as AudioPlayerProgressBar} from "./ProgressBarStyled";

export {default as AudioMedia} from "./AudioMedia";

// Export the types and other resources as well.
export * from "./Types";
export * from "./Other";
export * from "./Controllers";