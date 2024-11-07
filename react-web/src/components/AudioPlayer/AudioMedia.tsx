import { forwardRef, ReactEventHandler } from 'react';
import { AudioMediaProps } from './Types';
import { isMobile } from 'react-device-detect';

export default Object.assign(
    forwardRef<
        HTMLAudioElement, AudioMediaProps
    >(({src, onAudioLoaded, onTimeUpdate, ...props}, ref) => {
        const timeUpdateListener: ReactEventHandler<HTMLAudioElement> = (e) => {
            onTimeUpdate?.(e);
        };

        return (
            <audio
                ref={ref}
                onTimeUpdate={!isMobile ? timeUpdateListener : undefined}
                onSeeked={isMobile ? timeUpdateListener : undefined}

                {...props}

                onLoadedMetadata={onAudioLoaded}
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