import { forwardRef, useImperativeHandle } from 'react';
import { AudioMediaProps } from './Types';
import { useAudioMediaController } from './Controllers';

export default Object.assign(
    forwardRef<
        HTMLAudioElement, AudioMediaProps
    >(({src, onCanPlay, onTimeUpdate, mobileTimeUpdateInterval=500, ...props}, ref) => {
        const {
            audioRef,
            seekedHandler,
            timeUpdateHandler
        } = useAudioMediaController({onTimeUpdate, mobileTimeUpdateInterval});

        // Forward the value of audioRef to the parent component.
        useImperativeHandle(ref, () => audioRef.current!, [audioRef]);

        return (
            <audio
                ref={audioRef}
                onTimeUpdate={timeUpdateHandler}
                onSeeked={seekedHandler}

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