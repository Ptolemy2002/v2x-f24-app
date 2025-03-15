import DefaultAudioMedia from './AudioMedia';
import DefaultAudioPlayerProgressBar from './ProgressBarStyled';
import { AudioPlayerProps } from './Types';
import { useAudioPlayerController } from './Controllers';
import StyledButton from "src/components/StyledButton";
import DefaultPauseIcon from 'src/components/icons/PauseIcon';
import DefaultPlayIcon from 'src/components/icons/PlayIcon';
import DefaultRestartIcon from 'src/components/icons/RestartIcon';
import DefaultHourglassIcon from 'src/components/icons/HourglassIcon';

function AudioPlayerBase({
    src,
    onCanPlay,
    onLoadedMetadata,
    className: _className,
    AudioMedia = DefaultAudioMedia,
    ProgressBar = DefaultAudioPlayerProgressBar,
    PauseIcon = DefaultPauseIcon,
    PlayIcon = DefaultPlayIcon,
    RestartIcon = DefaultRestartIcon,
    HourglassIcon = DefaultHourglassIcon,
    throwErrors = true,
    onAudioError: _onAudioError,
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
        maxDuration,

        onAudioError,

        loading
    } = useAudioPlayerController({
        onCanPlay, onLoadedMetadata, className: _className,
        onAudioError: _onAudioError, throwErrors
    });

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

                onError={onAudioError}
            />

            <StyledButton
                $variant="pausePlay"
                onClick={buttonClickHandler}
            >
                {
                    loading ? <HourglassIcon /> :
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

export function applySubComponents<
    T extends typeof AudioPlayerBase
>(C: T) {
    return Object.assign(C, {
        AudioMedia: DefaultAudioMedia,
        ProgressBar: DefaultAudioPlayerProgressBar,
        PauseIcon: DefaultPauseIcon,
        PlayIcon: DefaultPlayIcon,
        RestartIcon: DefaultRestartIcon
    });
}

export default applySubComponents(AudioPlayerBase);