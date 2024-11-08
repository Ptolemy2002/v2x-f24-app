import {useEffect, useRef, useState} from "react";
import {SpeechBubbleTypingProps} from "./Types";
import DefaultScreenReaderText from "./ScreenReaderText";
import clsx from "clsx";

export default function SpeechBubbleTyping({
    origin,
    className,
    interval=500,
    maxDots=3,
    startDots=1,
    ScreenReaderText=DefaultScreenReaderText,
    ...props
}: SpeechBubbleTypingProps) {
    const [dots, setDots] = useState(startDots);
    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
        intervalRef.current = window.setInterval(() => {
            setDots((dots) => {
                const newDots = (dots + 1) % (maxDots + 1)
                if (newDots === 0) return startDots;
                return newDots;
            });
        }, interval);

        return () => {
            if (intervalRef.current !== null) {
                window.clearInterval(intervalRef.current);
            }
        };
    }, [interval, maxDots]);

    return (
        <div className={clsx("speech-bubble-typing", origin, className)} {...props}>
            <div className={`speech-bubble-content ${origin}`}>
                <ScreenReaderText origin={origin} text="is typing" />
                <span className="typing-indicator">
                    {
                        // Create a string of dots with the correct number of dots.
                        "·".repeat(dots)
                    }
                </span>
            </div>
        </div>
    );
}