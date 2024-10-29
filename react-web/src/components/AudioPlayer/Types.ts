import { FC, HTMLProps, RefObject, PropsWithChildren, PropsWithRef } from 'react';
import { RequiredCSSProperties } from 'src/Style';
import { MaybeForwardRefComponent } from 'src/TypeUtils';

export type AudioPlayerProps = {
    src: string;
    onAudioLoaded?: () => void;
    AudioMedia: MaybeForwardRefComponent<AudioMediaProps>;
    ProgressBar: FC<ProgressBarProps>;
} & HTMLProps<HTMLDivElement>;

export type AudioPlayerStyleAttributes = {
    $gap?: RequiredCSSProperties["gap"];
};

export type AudioMediaProps = PropsWithRef<{
    src: string;
    onAudioLoaded?: () => void;
    ref?: RefObject<HTMLAudioElement>;
}> & HTMLProps<HTMLAudioElement>;

export type ProgressBarProps = PropsWithChildren<{
    progress: number;
    duration: number;
    onSeek: (percentage: number) => void;
}> & HTMLProps<HTMLProgressElement>;