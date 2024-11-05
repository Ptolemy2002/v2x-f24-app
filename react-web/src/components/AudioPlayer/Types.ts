import { FC, HTMLProps, RefObject, PropsWithChildren, PropsWithRef } from 'react';
import { RequiredCSSProperties, WithCSSProp } from 'src/Style';
import { MaybeForwardRefComponent } from 'src/TypeUtils';

export type AudioPlayerProps = {
    src: string;
    onAudioLoaded?: () => void;
    AudioMedia?: MaybeForwardRefComponent<AudioMediaProps>;
    ProgressBar?: FC<ProgressBarProps>;
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
    onSeek: (x: number) => void;
    setProgress: (progress: number) => void;
}> & HTMLProps<HTMLProgressElement>;