// Since this is index.tsx, importing the folder itself will import this file.
// Don't put any other code in this file, just export the necessary resources.
// The styled component should be the default.
import UnstyledProgressBar from "./ProgressBar";
import ProgressBar from "./ProgressBarStyled";
import AudioMedia from "./AudioMedia";
import _UnstyledAudioPlayer from "./Base";
import AudioPlayer from "./BaseStyled";
import PausePlayButtonBase from "./PausePlayButtonBase";
import PausePlayButton from "./PausePlayButtonStyled";

export default Object.assign(AudioPlayer, {
    ProgressBar: ProgressBar,
    AudioMedia: AudioMedia,
    PausePlayButton: PausePlayButton
});

export const UnstyledAudioPlayer = Object.assign(_UnstyledAudioPlayer, {
    ProgressBar: UnstyledProgressBar,
    AudioMedia: AudioMedia,
    PausePlayButton: PausePlayButtonBase
});

export {default as UnstyledProgressBar} from "./ProgressBar";
export {default as ProgressBar} from "./ProgressBarStyled";

export {default as AudioMedia} from "./AudioMedia";

// Export the types and other resources as well.
export * from "./Types";
export * from "./Other";
export * from "./Controllers";