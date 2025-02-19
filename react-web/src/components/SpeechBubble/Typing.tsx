import {SpeechBubbleTypingProps} from "./Types";
import DefaultScreenReaderText from "./ScreenReaderText";
import { useSpeechBubbleTypingController } from "./Controllers";

function SpeechBubbleTypingBase({
    origin,
    className: _className,
    interval=500,
    maxDots=3,
    startDots=1,
    ScreenReaderText=DefaultScreenReaderText,
    ...props
}: SpeechBubbleTypingProps["functional"]) {
    const {
        dots,
        className
    } = useSpeechBubbleTypingController({
        startDots,
        maxDots,
        interval,
        className: _className
    })

    return (
        <div className={className} {...props}>
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

export function applySubComponents<
    T extends typeof SpeechBubbleTypingBase
>(C: T) {
    return Object.assign(C, {
        ScreenReaderText: DefaultScreenReaderText,
    });
}

export default applySubComponents(SpeechBubbleTypingBase);