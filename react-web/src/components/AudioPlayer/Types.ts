import { FC, HTMLProps, RefObject, PropsWithChildren, PropsWithRef } from 'react';
import { RequiredCSSProperties, WithCSSProp } from 'src/Style';
import { MaybeForwardRefComponent } from 'src/TypeUtils';
import { RestartIconProps } from 'src/components/icons/RestartIcon';
import { PlayIconProps } from 'src/components/icons/PlayIcon';
import { PauseIconProps } from '../icons/PauseIcon';

export type AudioPlayerProps = {
    src: string;
    onAudioLoaded?: () => void;
    AudioMedia?: MaybeForwardRefComponent<AudioMediaProps>;
    ProgressBar?: FC<ProgressBarProps>;
    RestartIcon?: FC<RestartIconProps>;
    PlayIcon?: FC<PlayIconProps>;
    PauseIcon?: FC<PauseIconProps>;
} & HTMLProps<HTMLDivElement>;

export type AudioPlayerStyleAttributes = WithCSSProp<{
    $gap?: RequiredCSSProperties["gap"];
}>;

export type AudioMediaProps = PropsWithRef<{
    src: string;
    onAudioLoaded?: () => void;
    ref?: RefObject<HTMLAudioElement>;
}> & HTMLProps<HTMLAudioElement>;

export type ProgressBarProps = PropsWithChildren<{
    progress: number;
    duration: number;
    onSeek: (progress: number) => void;
}> & HTMLProps<HTMLProgressElement>;