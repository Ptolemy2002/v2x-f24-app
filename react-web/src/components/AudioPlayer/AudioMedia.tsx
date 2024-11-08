import { forwardRef, useRef } from 'react';
import { AudioMediaProps } from './Types';
import { isMobile } from 'react-device-detect';
import { useMountEffect } from '@ptolemy2002/react-mount-effects';

export default Object.assign(
    forwardRef<
        HTMLAudioElement, AudioMediaProps
    >(({src, onCanPlay, onTimeUpdate, mobileTimeUpdateInterval=500, ...props}, ref) => {
        const intervalRef = useRef<number | null>(null);
        const timeUpdateListener = () => {
            onTimeUpdate?.();
        };

        useMountEffect(() => {
            if (isMobile) {
                intervalRef.current = window.setInterval(() => {
                    timeUpdateListener();
                }, mobileTimeUpdateInterval);
            }
        })

        return (
            <audio
                ref={ref}
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