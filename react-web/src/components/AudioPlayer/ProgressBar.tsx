import React, { MouseEvent, useCallback } from 'react';
import { ProgressBarProps } from './Types';

export default function({progress, duration, onSeek, children, ...props}: ProgressBarProps) {
    const seekHandler = useCallback((
        e: MouseEvent<HTMLProgressElement> | React.TouchEvent<HTMLProgressElement>
    ) => {
        const rect = e.currentTarget.getBoundingClientRect();

        let x: number;
        if (e instanceof TouchEvent) {
            const touch = e.touches[0];
            x = touch.clientX - rect.left;
        } else {
            e = e as MouseEvent<HTMLProgressElement>;
            x = e.clientX - rect.left;
        }

        const percentage = x / rect.width;
        onSeek(percentage);
    }, [progress, duration, onSeek]);

    return (
        <progress
            value={progress}
            max={duration}
            onMouseDown={seekHandler}
            onMouseMove={(e) => {
                // This means left mouse button is pressed
                // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons
                if (e.buttons === 1) {
                    seekHandler(e);
                }
            }}
            onTouchMove={(e) => {
                seekHandler(e);
            }}
            {...props}
        >
            {children}
        </progress>
    );
}