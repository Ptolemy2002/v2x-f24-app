import { forwardRef } from 'react';
import { AudioMediaProps } from './Types';

export default forwardRef<
    HTMLAudioElement, AudioMediaProps
>(({src, onAudioLoaded, ...props}, ref) => {
    return (
        <audio ref={ref} {...props} onLoadedData={onAudioLoaded}>
            <source src={src} />
            Your browser does not support the audio element.
        </audio>
    );
});