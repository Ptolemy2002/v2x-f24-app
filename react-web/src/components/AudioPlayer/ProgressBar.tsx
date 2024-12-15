import { ProgressBarProps } from './Types';
import { useProgressBarController } from './Controllers';

export default function ProgressBarBase({
    progress,
    maxDuration: duration,
    onSeek,
    children,
    ...props
}: ProgressBarProps) {
    const {
        progressRef,
        mouseDownHandler,
        touchStartHandler
    } = useProgressBarController({ onSeek });

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