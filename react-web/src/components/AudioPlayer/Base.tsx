import DefaultAudioMedia from './AudioMedia';
import DefaultProgressBar from './ProgressBarStyled';
import { AudioPlayerProps } from './Types';
import { Button } from 'react-bootstrap';
import DefaultRestartIcon from 'src/components/icons/RestartIcon';
import DefaultPlayIcon from 'src/components/icons/PlayIcon';
import DefaultPauseIcon from 'src/components/icons/PauseIcon';
import { useAudioPlayerController } from './Controllers';

export default function AudioPlayerBase({
    src,
    onCanPlay,
    onLoadedMetadata,
    className: _className,
    AudioMedia = DefaultAudioMedia,
    ProgressBar = DefaultProgressBar,
    RestartIcon = DefaultRestartIcon,
    PlayIcon = DefaultPlayIcon,
    PauseIcon = DefaultPauseIcon,
    ...props
}: AudioPlayerProps) {
    const {
        canPlayHandler,
        pauseHandler,
        playHandler,
        endedHandler,
        timeUpdateHandler,
        buttonClickHandler,

        audioRef,
        isPaused,
        isEnded,
        progress, setProgress,

        progressText,
        className,
        maxDuration
    } = useAudioPlayerController({onCanPlay, onLoadedMetadata, className: _className});

    return (
        <div className={className} {...props}>
            <AudioMedia
                ref={audioRef}
                src={src}
                onCanPlay={canPlayHandler}
                onLoadedMetadata={onLoadedMetadata}
                onPause={pauseHandler}
                onPlay={playHandler}
                onEnded={endedHandler}
                onTimeUpdate={timeUpdateHandler}
            />

            <Button
                variant="secondary"
                onClick={buttonClickHandler}
            >
                {
                    isPaused ? (
                        isEnded ? <RestartIcon /> : <PlayIcon />
                    ) : <PauseIcon />
                }
            </Button>
            
            <span className="progress-label">
                {progressText}
            </span>
            
            <ProgressBar
                progress={progress}
                maxDuration={maxDuration}
                onSeek={setProgress}
            >
                {progressText}
            </ProgressBar>
        </div>
    );
}