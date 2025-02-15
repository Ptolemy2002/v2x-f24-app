import DefaultAudioMedia from './AudioMedia';
import DefaultAudioPlayerProgressBar from './ProgressBarStyled';
import { AudioPlayerProps } from './Types';
import { useAudioPlayerController } from './Controllers';
import StyledButton from "src/components/StyledButton";
import DefaultPauseIcon from 'src/components/icons/PauseIcon';
import DefaultPlayIcon from 'src/components/icons/PlayIcon';
import DefaultRestartIcon from 'src/components/icons/RestartIcon';

export default function AudioPlayerBase({
    src,
    onCanPlay,
    onLoadedMetadata,
    className: _className,
    AudioMedia = DefaultAudioMedia,
    ProgressBar = DefaultAudioPlayerProgressBar,
    PauseIcon = DefaultPauseIcon,
    PlayIcon = DefaultPlayIcon,
    RestartIcon = DefaultRestartIcon,
    ...props
}: AudioPlayerProps["functional"]) {
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

            <StyledButton
                $variant="pausePlay"
                onClick={buttonClickHandler}
            >
                {
                    isPaused ? (
                        isEnded ? <RestartIcon /> : <PlayIcon />
                    ) : <PauseIcon />
                }
            </StyledButton>
            
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