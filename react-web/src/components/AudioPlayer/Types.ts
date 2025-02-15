import { FC, HTMLProps, RefObject, PropsWithChildren, PropsWithRef } from 'react';
import { RequiredCSSProperties, StyledComponentPropsWithCSS, WithCSSProp } from '@ptolemy2002/react-styled-component-utils';
import { MaybeForwardRefComponent } from 'src/TypeUtils';
import { RestartIconProps } from 'src/components/icons/RestartIcon';
import { PlayIconProps } from 'src/components/icons/PlayIcon';
import { PauseIconProps } from 'src/components/icons/PauseIcon';
import { Override } from '@ptolemy2002/ts-utils';

export type AudioPlayerProps = StyledComponentPropsWithCSS<{
    src: string;
    onCanPlay?: () => void;
    onLoadedMetadata?: () => void;
    AudioMedia?: MaybeForwardRefComponent<AudioMediaProps>;
    ProgressBar?: FC<AudioPlayerProgressBarProps & WithCSSProp>;
    RestartIcon?: FC<RestartIconProps>;
    PlayIcon?: FC<PlayIconProps>;
    PauseIcon?: FC<PauseIconProps>;
} & HTMLProps<HTMLDivElement>, {
    gap?: RequiredCSSProperties["gap"];
}>;
export type AudioPlayerControllerProps = Pick<AudioPlayerProps["functional"], 'onCanPlay' | 'onLoadedMetadata' | 'className'>;

export type AudioMediaProps = PropsWithRef<{
    src: string;
    mobileTimeUpdateInterval?: number;
    onCanPlay?: () => void;
    onTimeUpdate?: () => void;
    ref?: RefObject<HTMLAudioElement>;
}> & HTMLProps<HTMLAudioElement>;
export type AudioMediaControllerProps = Pick<AudioMediaProps, 'onTimeUpdate' | 'mobileTimeUpdateInterval'>;

export type AudioPlayerProgressBarProps = Override<
    HTMLProps<HTMLProgressElement>, 
    PropsWithChildren<{
        progress: number;
        maxDuration: number;
        onSeek: (progress: number) => void;
        ref?: RefObject<HTMLProgressElement>;
    }>
>;
export type AudioPlayerProgressBarControllerProps = Pick<AudioPlayerProgressBarProps, 'onSeek'>;