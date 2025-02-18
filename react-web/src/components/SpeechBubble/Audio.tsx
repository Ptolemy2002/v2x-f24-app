import { SpeechBubbleAudioProps } from "./Types";
import DefaultAudioPlayer from "src/components/AudioPlayer";
import DefaultScreenReaderText from "./ScreenReaderText";
import DefaultTimestampWrapper from "src/components/TimestampWrapper";
import DefaultSpeechBubbleTimestamp from "./TimestampStyled";
import clsx from "clsx";
import ConversationData from "src/data/ConversationData";
import { ReactNode } from "react";

export default function SpeechBubbleAudioBase({
    message,
    className,
    scrollToEnd,
    TimestampWrapper = DefaultTimestampWrapper,
    ScreenReaderText = DefaultScreenReaderText,
    SpeechBubbleTimestamp = DefaultSpeechBubbleTimestamp,
    AudioPlayer = DefaultAudioPlayer,
    ...props
}: SpeechBubbleAudioProps["functional"]) {
    const [conversation] = ConversationData.useContextNonNullable(["files"]);
    const file = conversation.files[message.src];

    let element: ReactNode;
    if (!file) {
        element = `Unrecognized audio file: ${message.src}`;
    } else {
        element = (
            <AudioPlayer
                src={file.url}
                alt={message.alt ?? file.alt}
                onLoadedMetadata={scrollToEnd}
            />
        );
    }

    return (
        <div className={clsx("speech-bubble-aud", message.origin, className)} {...props}>
            <TimestampWrapper date={message.date} updateInterval={10} render={(text) => <SpeechBubbleTimestamp text={text} />} />
            
            <div className={`speech-bubble-content ${message.origin}`}>
                <ScreenReaderText origin={message.origin} text="sent an audio message" />
                {element}
            </div>
        </div>
    );
}