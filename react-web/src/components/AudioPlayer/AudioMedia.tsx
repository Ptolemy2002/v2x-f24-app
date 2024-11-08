import { forwardRef, useImperativeHandle, useRef } from 'react';
import { AudioMediaProps } from './Types';
import { isMobile } from 'react-device-detect';
import { useMountEffect } from '@ptolemy2002/react-mount-effects';

export default Object.assign(
    forwardRef<
        HTMLAudioElement, AudioMediaProps
    >(({src, onCanPlay, onTimeUpdate, mobileTimeUpdateInterval=500, ...props}, ref) => {
        const intervalRef = useRef<number | null>(null);
        const audioRef = useRef<HTMLAudioElement | null>(null);
        const timeUpdateListener = () => {
            onTimeUpdate?.();
        };

        // Forward the value of audioRef to the parent component.
        useImperativeHandle(ref, () => audioRef.current!, [audioRef.current]);

        useMountEffect(() => {
            if (isMobile) {
                // Set the interval for mobile devices, as onTimeUpdate is not supported
                // in the same way as it is on desktop. We need to catch updated time values
                // manually.
                intervalRef.current = window.setInterval(() => {
                    timeUpdateListener();
                }, mobileTimeUpdateInterval);
            }
        })

        return (
            <audio
                ref={audioRef}
                onTimeUpdate={!isMobile ? timeUpdateListener : undefined}
                onSeeked={isMobile ? timeUpdateListener : undefined}

                {...props}

                onCanPlay={onCanPlay}
            >
                <source src={src} />
                Your browser does not support the audio element.
            </audio>
        );
    }),
    {
        displayName: 'forwardRef(AudioMedia)'
    }
);