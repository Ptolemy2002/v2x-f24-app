import { HTMLProps, useMemo, useRef, forwardRef, useState, RefObject, MouseEvent, useCallback } from "react";
import clsx from "clsx";
import PlayIcon from "src/components/icons/PlayIcon";
import PauseIcon from "src/components/icons/PauseIcon";
import { Button } from "react-bootstrap";
import { intervalToDuration, Duration } from "date-fns";
import RestartIcon from "src/components/icons/RestartIcon";
import { AUDIO_PLAYER_GAP, AUDIO_PLAYER_PROGRESS_BACKGROUND_COLOR, AUDIO_PLAYER_PROGRESS_COLOR, centerVertical } from "src/Style";
import styled from "styled-components";

function formatDuration(duration: Duration) {
    const hours = (duration.hours ?? 0).toString()
    const minutes = (duration.minutes ?? 0).toString();
    const seconds = (duration.seconds ?? 0).toString();

    const result = minutes.padStart(2, "0") + ":" + seconds.padStart(2, "0");
    if (hours !== "0") {
        return hours.padStart(2, "0") + ":" + result;
    } else {
        return result;
    }
}

export type AudioPlayerProps = {
    src: string;
    onAudioLoaded?: () => void;
} & HTMLProps<HTMLDivElement>;
function _AudioPlayer({src, onAudioLoaded, className, ...props}: AudioPlayerProps) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isAudioLoaded, setIsAudioLoaded] = useState(false);

    const [isPaused, setIsPaused] = useState(true);
    const [isEnded, setIsEnded] = useState(false);
    const [progress, setProgress] = useState(0);

    const formattedProgress = intervalToDuration({start: 0, end: progress * 1000});
    const formattedDuration = useMemo(() => {
        const audio = audioRef.current;
        if (!audio) {
            return {minutes: 0, seconds: 0};
        }

        return intervalToDuration({start: 0, end: audio.duration * 1000});
    }, [audioRef.current?.duration, isAudioLoaded]);
    // even though we don't use isAudioLoaded, we need to include it to make sure the duration calculated
    // initially is correct. Otherwise it will be stuck at 0 until we play for the first time.

    return (
        <div className={clsx("audio-player", className)} {...props}>
            <AudioMedia
                ref={audioRef}
                src={src}
                onAudioLoaded={() => {
                    setIsAudioLoaded(true);
                    onAudioLoaded?.();
                }}

                onPause={() => setIsPaused(true)}
                onPlay={() => {
                    setIsPaused(false);
                    setIsEnded(false);
                }}
                onEnded={() => setIsEnded(true)}
                onTimeUpdate={() => {
                    const currentTime = audioRef.current?.currentTime ?? 0;

                    // We don't have to update the progress every time this event is fired,
                    // only when the difference between the current time and the progress is
                    // greater than or equal to 1 second.
                    if (Math.abs(progress - currentTime) >= 1) {
                        setProgress(currentTime);
                    }
                }}
            />

            <Button
                variant="secondary"
                onClick={() => {
                    const audio = audioRef.current;
                    if (audio) {
                        audio.paused ? audio.play() : audio.pause();
                    }
                }}
            >
                {
                    isPaused ? (
                        isEnded ? <RestartIcon /> : <PlayIcon />
                    ) : <PauseIcon />
                }
            </Button>
            
            <span className="progress-label">
                {
                    formatDuration(isEnded ? formattedDuration : formattedProgress)
                } / {formatDuration(formattedDuration)}
            </span>
            
            <ProgressBar
                progress={progress}
                duration={audioRef.current?.duration ?? 0}
                onSeek={(percentage) => {
                    const audio = audioRef.current;
                    if (audio) {
                        audio.currentTime = audio.duration * percentage;
                    }
                }}
            />
        </div>
    );
}

const AudioPlayer = styled(_AudioPlayer)`
    display: flex;
    flex-direction: row;
    gap: ${AUDIO_PLAYER_GAP};
    width: 100%;

    > .progress-label {
        ${centerVertical()}
    }

    > progress {
        flex-grow: 1;

        // IE10
        background-color: ${AUDIO_PLAYER_PROGRESS_BACKGROUND_COLOR};
        color: ${AUDIO_PLAYER_PROGRESS_COLOR};

        // Chrome and Safari
        &::-webkit-progress-value {
            background-color: ${AUDIO_PLAYER_PROGRESS_COLOR};
        }
        &::-webkit-progress-bar {
            background-color: ${AUDIO_PLAYER_PROGRESS_BACKGROUND_COLOR};
        }

        // Firefox
        &::-moz-progress-bar {
            background-color: ${AUDIO_PLAYER_PROGRESS_COLOR};
        }

        border: none;
        ${centerVertical()}
    }
`;
AudioPlayer.displayName = "AudioPlayer";
export default AudioPlayer;

export type AudioMediaProps = {
    src: string;
    onAudioLoaded?: () => void;
    ref?: RefObject<HTMLAudioElement>;
} & HTMLProps<HTMLAudioElement>;

export const AudioMedia = forwardRef<HTMLAudioElement, AudioMediaProps>(({src, onAudioLoaded, ...props}, ref) => {
    return (
        <audio ref={ref} {...props} onLoadedData={onAudioLoaded}>
            <source src={src} />
            Your browser does not support the audio element.
        </audio>
    );
});

export type ProgressBarProps = {
    progress: number;
    duration: number;
    onSeek: (percentage: number) => void;
} & HTMLProps<HTMLProgressElement>;

export function ProgressBar({progress, duration, onSeek, ...props}: ProgressBarProps) {
    const seekHandler = useCallback((e: MouseEvent<HTMLProgressElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = x / rect.width;
        onSeek(percentage);
    }, [progress, duration, onSeek]);

    return (
        <progress
            value={progress}
            max={duration}
            onMouseDown={seekHandler}
            onMouseMove={(e) => {
                // This means left mouse button is pressed
                // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons
                if (e.buttons === 1) {
                    seekHandler(e);
                }
            }}
            {...props}
        />
    );
}