import { useRef } from 'react';
import { useMountEffect, useUnmountEffect } from '@ptolemy2002/react-mount-effects';
import { ProgressBarProps } from './Types';
import { handleSeekDesktop } from './Other';

export default function ProgressBar({progress, duration, onSeek, setProgress, children, ...props}: ProgressBarProps) {
    const touchedRef = useRef(false);
    const mouseUpEventListenerRef = useRef<() => void>();
    const mouseMoveEventListenerRef = useRef<(e: MouseEvent) => void>();
    const progressRef = useRef<HTMLProgressElement>(null);

    useMountEffect(() => {
        mouseUpEventListenerRef.current = () => {
            touchedRef.current = false;
        };
        window.addEventListener("mouseup", mouseUpEventListenerRef.current);

        mouseMoveEventListenerRef.current = (e) => {
            if (touchedRef.current) {
                handleSeekDesktop(e, progressRef.current!, onSeek);
            }
        };
        window.addEventListener("mousemove", mouseMoveEventListenerRef.current);
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
            onMouseDown={(e) => {
                touchedRef.current = true;

                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                setProgress(x / rect.width);
            }}
            {...props}
        >
            {children}
        </progress>
    );
}