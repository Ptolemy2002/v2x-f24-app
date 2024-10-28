import DefaultAudioMedia from './AudioMedia';
import DefaultProgressBar from './ProgressBarStyled';
import { AudioPlayerProps } from './Types';
import { formatDuration } from './Other';
import { intervalToDuration } from 'date-fns';
import { useRef, useState, useMemo } from 'react';
import { Button } from 'react-bootstrap';
import RestartIcon from 'src/components/icons/RestartIcon';
import PlayIcon from 'src/components/icons/PlayIcon';
import PauseIcon from 'src/components/icons/PauseIcon';
import clsx from 'clsx';

export default function({
    src,
    onAudioLoaded,
    className,
    AudioMedia = DefaultAudioMedia,
    ProgressBar = DefaultProgressBar,
    ...props
}: AudioPlayerProps) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isAudioLoaded, setIsAudioLoaded] = useState(false);

    const [isPaused, setIsPaused] = useState(true);
    const [isEnded, setIsEnded] = useState(false);
    const [progress, setProgress] = useState(0);

    const formattedProgress = intervalToDuration({start: 0, end: progress * 1000});
    const formattedDuration = useMemo(() => {
        const audio = audioRef.current;
        if (!audio) {
            return {hours: 0, minutes: 0, seconds: 0};
        }

        // Since the audio should definitely not be longer than 24 hours, we can safely
        // use this duration, as the amount of hours will always be accurate.
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