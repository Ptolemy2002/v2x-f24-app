import { FC, ForwardRefExoticComponent, HTMLProps, RefAttributes, RefObject } from 'react';
import { RequiredCSSProperties } from 'src/Style';

export type AudioPlayerProps = {
    src: string;
    onAudioLoaded?: () => void;
    AudioMedia: ForwardRefExoticComponent<Omit<AudioMediaProps, "ref"> & RefAttributes<HTMLAudioElement>>;
    ProgressBar: FC<ProgressBarProps>;
} & HTMLProps<HTMLDivElement>;

export type AudioPlayerStyleAttributes = {
    $gap?: RequiredCSSProperties["gap"];
};

export type AudioMediaProps = {
    src: string;
    onAudioLoaded?: () => void;
    ref?: RefObject<HTMLAudioElement>;
} & HTMLProps<HTMLAudioElement>;

export type ProgressBarProps = {
    progress: number;
    duration: number;
    onSeek: (percentage: number) => void;
} & HTMLProps<HTMLProgressElement>;