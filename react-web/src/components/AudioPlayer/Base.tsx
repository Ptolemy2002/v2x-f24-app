import DefaultAudioMedia from './AudioMedia';
import DefaultAudioPlayerProgressBar from './ProgressBarStyled';
import { AudioPlayerProps } from './Types';
import { useAudioPlayerController } from './Controllers';
import DefaultPausePlayButton from './PausePlayButtonStyled';

export default function AudioPlayerBase({
    src,
    onCanPlay,
    onLoadedMetadata,
    className: _className,
    AudioMedia = DefaultAudioMedia,
    AudioPlayerProgressBar = DefaultAudioPlayerProgressBar,
    PausePlayButton= DefaultPausePlayButton,
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

            <PausePlayButton
                isPaused={isPaused}
                isEnded={isEnded}
                onClick={buttonClickHandler}
            />
            
            <span className="progress-label">
                {progressText}
            </span>
            
            <AudioPlayerProgressBar
                progress={progress}
                maxDuration={maxDuration}
                onSeek={setProgress}
            >
                {progressText}
            </AudioPlayerProgressBar>
        </div>
    );
}