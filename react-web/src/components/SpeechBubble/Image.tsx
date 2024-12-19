import { SpeechBubbleImageProps } from "./Types";
import DefaultTimestampWrapper from "src/components/TimestampWrapper";
import DefaultSpeechBubbleTimestamp from "./TimestampStyled";
import DefaultScreenReaderText from "./ScreenReaderText";
import clsx from "clsx";

export default function SpeechBubbleImageBase({
    message,
    scrollToEnd,
    className,
    TimestampWrapper = DefaultTimestampWrapper,
    ScreenReaderText = DefaultScreenReaderText,
    SpeechBubbleTimestamp = DefaultSpeechBubbleTimestamp,
    ...props
}: SpeechBubbleImageProps["functional"]) {
    return (
        <div
            className={clsx("speech-bubble-img", message.origin, className)}
            {...props} // Pass any additional props to the element itself.
        >
            <TimestampWrapper date={message.date} updateInterval={10} render={(text) => <SpeechBubbleTimestamp text={text} />} />
            <div className={`speech-bubble-content ${message.origin}`}>
                <ScreenReaderText origin={message.origin} text="sent an image" />
                <img
                    onLoad={scrollToEnd}
                    src={message.src}
                    alt={message.alt ?? ""} // ?? here is the nullish coalescing operator, which returns the right side if the left side is null or undefined.
                />
            </div>
        </div>
    );
}