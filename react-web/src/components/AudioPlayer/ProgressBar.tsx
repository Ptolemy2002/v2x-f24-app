import React, { useCallback, useRef } from 'react';
import { useMountEffect, useUnmountEffect } from '@ptolemy2002/react-mount-effects';
import { ProgressBarProps } from './Types';
import { handleSeek } from './Other';
import { isMobile } from 'react-device-detect';

export default function ProgressBar({
    progress,
    duration,
    onSeek,
    children,
    ...props
}: ProgressBarProps) {
    const touchedRef = useRef(false);
    const mouseUpEventListenerRef = useRef<() => void>();
    const touchEndEventListenerRef = useRef<() => void>();
    const mouseMoveEventListenerRef = useRef<(e: MouseEvent) => void>();
    const touchMoveEventListenerRef = useRef<(e: TouchEvent) => void>();
    const progressRef = useRef<HTMLProgressElement>(null);

    const mouseDownEventListener = useCallback((e: React.MouseEvent | React.TouchEvent) => {
        touchedRef.current = true;

        if (e instanceof MouseEvent) {
            handleSeek(e.clientX, progressRef.current!, onSeek);
        } else {
            e = e as React.TouchEvent;
            const touch = e.touches[0];
            handleSeek(touch.clientX, progressRef.current!, onSeek);
        }
    }, []);

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
                handleSeek(e.touches[0].clientX, progressRef.current!, onSeek);
            }
        };
        window.addEventListener("touchmove", touchMoveEventListenerRef.current);
    });

    useUnmountEffect(() => {
        window.removeEventListener("mouseup", mouseUpEventListenerRef.current!);
        window.removeEventListener("mousemove", mouseMoveEventListenerRef.current!);
    });

    return (
        <progress
            ref={progressRef}
            value={progress}
            max={duration}
            onMouseDown={!isMobile ? mouseDownEventListener : undefined}
            onTouchStart={isMobile ? mouseDownEventListener : undefined}

            {...props}
        >
            {children}
        </progress>
    );
}