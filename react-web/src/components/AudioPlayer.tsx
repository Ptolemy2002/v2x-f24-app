import { HTMLProps, useRef, useState } from "react";
import clsx from "clsx";
import PlayIcon from "./icons/PlayIcon";
import PauseIcon from "./icons/PauseIcon";
import { Button } from "react-bootstrap";

export type AudioPlayerProps = {
    src: string;
    onAudioLoaded?: () => void;
} & HTMLProps<HTMLDivElement>;
export default function AudioPlayer({src, onAudioLoaded, className, ...props}: AudioPlayerProps) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPaused, setIsPaused] = useState(true);
    const [progress, setProgress] = useState(0);

    return (
        <div className={clsx("audio-player", className)} {...props}>
            <audio
                ref={audioRef}
                onLoadedMetadata={onAudioLoaded}
                onPause={() => setIsPaused(true)}
                onPlay={() => setIsPaused(false)}
                onTimeUpdate={() => {
                    setProgress(audioRef.current?.currentTime ?? 0);
                }}
            >
                <source src={src} />
                Your browser does not support the audio element.
            </audio>

            <Button
                variant="secondary"
                onClick={() => {
                    const audio = audioRef.current;
                    if (audio) {
                        audio.paused ? audio.play() : audio.pause();
                    }
                }}
            >
                {isPaused ? <PlayIcon /> : <PauseIcon />}
            </Button>
            {progress.toFixed(2)}s/{(audioRef.current?.duration ?? 0).toFixed(2)}s
        </div>
    );
}