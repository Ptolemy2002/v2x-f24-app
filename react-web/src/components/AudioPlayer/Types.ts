import { FC, HTMLProps, RefObject, PropsWithChildren, PropsWithRef } from 'react';
import { RequiredCSSProperties, StyledComponentPropsWithCSS, WithCSSProp } from '@ptolemy2002/react-styled-component-utils';
import { MaybeForwardRefComponent } from 'src/TypeUtils';
import { RestartIconProps } from 'src/components/icons/RestartIcon';
import { PlayIconProps } from 'src/components/icons/PlayIcon';
import { PauseIconProps } from '../icons/PauseIcon';
import { ButtonProps } from 'react-bootstrap';
import { ButtonStyles } from 'styled-components';

export type AudioPlayerProps = StyledComponentPropsWithCSS<{
    src: string;
    onCanPlay?: () => void;
    onLoadedMetadata?: () => void;
    AudioMedia?: MaybeForwardRefComponent<AudioMediaProps>;
    AudioPlayerProgressBar?: FC<AudioPlayerProgressBarProps & WithCSSProp>;
    PausePlayButton?: FC<PausePlayButtonProps["functional"]>;
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

export type AudioPlayerProgressBarProps = PropsWithChildren<{
    progress: number;
    maxDuration: number;
    onSeek: (progress: number) => void;
}> & HTMLProps<HTMLProgressElement>;
export type AudioPlayerProgressBarControllerProps = Pick<AudioPlayerProgressBarProps, 'onSeek'>;

export type PausePlayButtonProps = StyledComponentPropsWithCSS<{
    isPaused: boolean;
    isEnded: boolean;
    RestartIcon?: FC<RestartIconProps>;
    PlayIcon?: FC<PlayIconProps>;
    PauseIcon?: FC<PauseIconProps>;
} & ButtonProps, ButtonStyles>;