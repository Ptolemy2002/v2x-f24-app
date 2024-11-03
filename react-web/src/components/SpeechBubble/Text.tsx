import { SpeechBubbleTextProps } from "./Types";
import DefaultTimestampWrapper from "src/components/TimestampWrapper";
import DefaultSpeechBubbleTimestamp from "./TimestampStyled";
import DefaultScreenReaderText from "./ScreenReaderText";
import clsx from "clsx";

export default function({
    message,
    className,
    TimestampWrapper = DefaultTimestampWrapper,
    SpeechBubbleTimestamp = DefaultSpeechBubbleTimestamp,
    ScreenReaderText = DefaultScreenReaderText,
    ...props
}: SpeechBubbleTextProps) {
    const lines = message.text.split("\n");
    return (
        <div className={clsx("speech-bubble-txt", message.origin, className)} {...props}>
            <TimestampWrapper date={message.date} updateInterval={10} render={(text) => <SpeechBubbleTimestamp text={text} />} />
            <div className={`speech-bubble-content ${message.origin}`}>
                <ScreenReaderText origin={message.origin} />

                {
                    // Create a br element after each line except the last one.
                    lines.map((line, i) => (
                        <span key={`line-${i}`}>
                            {line}
                            {
                                // If the left side is false, the expression evaluates to false, which means React
                                // won't render anything here. Otherwise, it will evaluate to the right side,
                                // which is a br element in this case.
                                i < lines.length - 1 && <br />
                            }
                        </span>
                    ))
                }
            </div>
        </div>
    );
}