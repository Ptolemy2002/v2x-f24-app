import { AudioPlayerProgressBarProps } from './Types';
import { useAudioPlayerProgressBarController } from './Controllers';

function AudioPlayerProgressBarBase({
    progress,
    maxDuration: duration,
    onSeek,
    children,
    ...props
}: AudioPlayerProgressBarProps) {
    const {
        progressRef,
        mouseDownHandler,
        touchStartHandler
    } = useAudioPlayerProgressBarController({ onSeek });

    return (
        <progress
            ref={progressRef}
            value={progress}
            max={duration}
            onMouseDown={mouseDownHandler}
            onTouchStart={touchStartHandler}

            {...props}
        >
            {children}
        </progress>
    );
}

export function applySubComponents<
    T extends typeof AudioPlayerProgressBarBase
>(C: T) {
    return Object.assign(C, {});
}

export default applySubComponents(AudioPlayerProgressBarBase);