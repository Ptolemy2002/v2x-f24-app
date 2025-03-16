import { useCallback, useRef, useState, useMemo, SyntheticEvent } from 'react';
import { AudioMediaControllerProps, AudioPlayerControllerProps, AudioPlayerProgressBarControllerProps } from './Types';
import { intervalToDuration } from 'date-fns';
import { formatDuration } from './Other';
import clsx from 'clsx';
import { useMountEffect, useUnmountEffect } from '@ptolemy2002/react-mount-effects';
import { isMobile } from 'react-device-detect';
import { handleSeek } from './Other';
import useManualErrorHandling from '@ptolemy2002/react-manual-error-handling';

export function useAudioPlayerController({
    onCanPlay,
    onLoadedMetadata,
    className: _className,
    throwErrors,
    onAudioError: _onAudioError
}: AudioPlayerControllerProps) {
    const audioRef = useRef<HTMLAudioElement>(null);

    const [hadError, setHadError] = useState(false);

    const { _throw } = useManualErrorHandling();

    const [canPlay, setCanPlay] = useState(false);
    
    const [isPaused, setIsPaused] = useState(true);
    const [isEnded, setIsEnded] = useState(false);
    const [progress, _setProgress] = useState(0);

    const setProgress = useCallback((progress: number) => {
        const audio = audioRef.current;
        if (audio) {
            audio.currentTime = progress * audio.duration;
            _setProgress(progress * audio.duration);
            
            if (progress < 1) {
                setIsEnded(false);
            }
        }
    }, []);

    const progressDuration = useMemo(
        () => intervalToDuration({start: 0, end: progress * 1000}),
        [progress]
    );

    const totalDuration = useMemo(() => {
        const audio = audioRef.current;
        if (!audio) {
            return {hours: 0, minutes: 0, seconds: 0};
        }

        // Since the audio should definitely not be longer than 24 hours, we can safely
        // use this duration, as the amount of hours will always be accurate.
        return intervalToDuration({start: 0, end: audio.duration * 1000});
    }, [audioRef.current?.duration, canPlay]);
    // even though we don't use canPlay, we need to include it to make sure the duration calculated
    // initially is correct. Otherwise it will be stuck at 0 until we play for the first time.

    const progressText = useMemo(() => `
        ${
            formatDuration(isEnded ? totalDuration : progressDuration)
        } / ${formatDuration(totalDuration)}
    `, [progressDuration, totalDuration, isEnded]);

    const onAudioError = useCallback((e: SyntheticEvent<HTMLAudioElement, Event>) => {
        setCanPlay(false);
        setHadError(true);

        _onAudioError?.(e);
        if (throwErrors) _throw(e);
    }, [throwErrors, _onAudioError]);

    const canPlayHandler = useCallback(() => {
        setCanPlay(true);
        setHadError(false);

        onCanPlay?.();
    }, [onCanPlay]);

    const loadedMetadataHandler = useCallback(() => {
        onLoadedMetadata?.();
    }, [onLoadedMetadata]);

    const pauseHandler = useCallback(() => {
        setIsPaused(true);
    }, []);

    const playHandler = useCallback(() => {
        setIsPaused(false);
        setIsEnded(false);
    }, []);

    const endedHandler = useCallback(() => {
        setIsEnded(true);
    }, []);

    const timeUpdateHandler = useCallback(() => {
        const currentTime = audioRef.current?.currentTime ?? 0;

        // We don't have to update the progress every time this event is fired,
        // only when the difference between the current time and the progress is
        // greater than or equal to 1 second.
        if (Math.abs(progress - currentTime) >= 1) {
            // bypass the setter to avoid skipping in the audio playback
            _setProgress(currentTime);
        }
    }, [progress]);

    const buttonClickHandler = useCallback(() => {
        const audio = audioRef.current;
        if (canPlay && audio) {
            audio.paused ? audio.play() : audio.pause();
        }
    }, [canPlay]);

    const className = useMemo(() => clsx("audio-player", _className), [_className]);
    const maxDuration = useMemo(() => {
        const result = audioRef.current?.duration ?? 0;
        if (isNaN(result)) return 0;
        return result;
    }, [audioRef.current?.duration]);

    return {
        audioRef,
        canPlay,
        isPaused,
        isEnded,
        progress,
        setProgress,
        progressDuration,
        totalDuration,
        progressText,
        canPlayHandler,
        loadedMetadataHandler,
        pauseHandler,
        playHandler,
        endedHandler,
        timeUpdateHandler,
        buttonClickHandler,
        className,
        maxDuration,

        loading: !canPlay,
        error: hadError,
        setError: setHadError,

        onAudioError
    };
}

export function useAudioMediaController({
    onTimeUpdate,
    mobileTimeUpdateInterval
}: AudioMediaControllerProps) {
    const intervalRef = useRef<number | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const timeUpdateListener = useCallback(() => {
        onTimeUpdate?.();
    }, [onTimeUpdate]);

    useMountEffect(() => {
        if (isMobile) {
            // Set the interval for mobile devices, as onTimeUpdate is not supported
            // in the same way as it is on desktop. We need to catch updated time values
            // manually.
            intervalRef.current = window.setInterval(() => {
                timeUpdateListener();
            }, mobileTimeUpdateInterval);
        }
    });

    const seekedHandler = useMemo(() => isMobile ? timeUpdateListener : undefined, [timeUpdateListener]);
    const timeUpdateHandler = useMemo(() => !isMobile ? timeUpdateListener : undefined, [timeUpdateListener]);

    return {
        intervalRef,
        audioRef,
        seekedHandler,
        timeUpdateHandler
    };
}

export function useAudioPlayerProgressBarController({
    onSeek
}: AudioPlayerProgressBarControllerProps) {
    const touchedRef = useRef(false);
    const mouseUpEventListenerRef = useRef<() => void>();
    const touchEndEventListenerRef = useRef<() => void>();
    const mouseMoveEventListenerRef = useRef<(e: MouseEvent) => void>();
    const touchMoveEventListenerRef = useRef<(e: TouchEvent) => void>();
    const progressRef = useRef<HTMLProgressElement>(null);

    const mouseDownEventListener = useCallback((e: React.MouseEvent | React.TouchEvent) => {
        touchedRef.current = true;

        if (e.nativeEvent instanceof MouseEvent) {
            handleSeek(e.nativeEvent.clientX, progressRef.current!, onSeek);
        } else {
            const touch = e.nativeEvent.touches[0]!;
            handleSeek(touch.clientX, progressRef.current!, onSeek);
        }
    }, [onSeek]);

    useMountEffect(() => {
        mouseUpEventListenerRef.current = () => {
            touchedRef.current = false;
        };
        window.addEventListener("mouseup", mouseUpEventListenerRef.current);

        mouseMoveEventListenerRef.current = (e) => {
            if (touchedRef.current) {
                handleSeek(e.clientX, progressRef.current!, onSeek);
            }
        };
        window.addEventListener("mousemove", mouseMoveEventListenerRef.current);

        touchEndEventListenerRef.current = () => {
            touchedRef.current = false;
        };
        window.addEventListener("touchend", touchEndEventListenerRef.current);

        touchMoveEventListenerRef.current = (e) => {
            if (touchedRef.current) {
                handleSeek(e.touches[0]!.clientX, progressRef.current!, onSeek);
            }
        };
        window.addEventListener("touchmove", touchMoveEventListenerRef.current);
    });

    useUnmountEffect(() => {
        window.removeEventListener("mouseup", mouseUpEventListenerRef.current!);
        window.removeEventListener("mousemove", mouseMoveEventListenerRef.current!);
        window.removeEventListener("touchend", touchEndEventListenerRef.current!);
        window.removeEventListener("touchmove", touchMoveEventListenerRef.current!);
    });

    const mouseDownHandler = useMemo(() => !isMobile ? mouseDownEventListener : undefined, [isMobile, mouseDownEventListener]);
    const touchStartHandler = useMemo(() => isMobile ? mouseDownEventListener : undefined, [isMobile, mouseDownEventListener]);

    return {
        touchedRef,
        mouseUpEventListenerRef,
        touchEndEventListenerRef,
        mouseMoveEventListenerRef,
        touchMoveEventListenerRef,
        progressRef,

        mouseDownEventListener,
        mouseDownHandler,
        touchStartHandler
    };

}