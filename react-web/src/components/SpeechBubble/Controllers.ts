import { useState, useRef, useEffect, useMemo } from "react";
import { SpeechBubbleTypingControllerProps } from "./Types";
import clsx from "clsx";

export function useSpeechBubbleTypingController({
    startDots=1,
    maxDots=3,
    interval=500,
    className: _className,
}: SpeechBubbleTypingControllerProps) {
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
    }, [interval, maxDots, startDots]);

    const className = useMemo(() => clsx("speech-bubble-typing", origin, _className), [origin, _className]);

    return {
        dots,
        intervalRef,
        className
    };
}