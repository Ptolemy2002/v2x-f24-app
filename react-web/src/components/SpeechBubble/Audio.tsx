import { SpeechBubbleAudioProps } from "./Types";
import DefaultAudioPlayer from "src/components/AudioPlayer";
import DefaultScreenReaderText from "./ScreenReaderText";
import DefaultTimestampWrapper from "src/components/TimestampWrapper";
import DefaultSpeechBubbleTimestamp from "./Timestamp";
import clsx from "clsx";

export default function SpeechBubbleAudio({
    message,
    className,
    scrollToEnd,
    TimestampWrapper = DefaultTimestampWrapper,
    ScreenReaderText = DefaultScreenReaderText,
    SpeechBubbleTimestamp = DefaultSpeechBubbleTimestamp,
    AudioPlayer = DefaultAudioPlayer,
    ...props
}: SpeechBubbleAudioProps) {
    return (
        <div className={clsx("speech-bubble-aud", message.origin, className)} {...props}>
            <TimestampWrapper date={message.date} updateInterval={10} render={(text) => <SpeechBubbleTimestamp text={text} />} />
            
            <div className={`speech-bubble-content ${message.origin}`}>
                <ScreenReaderText origin={message.origin} text="sent an audio message" />

                <AudioPlayer
                    src={message.src}
                    onLoadedMetadata={scrollToEnd}
                />
            </div>
        </div>
    );
}