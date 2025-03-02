import { SpeechBubbleAudioProps } from "./Types";
import DefaultAudioPlayer from "src/components/AudioPlayer";
import DefaultScreenReaderText from "./ScreenReaderText";
import DefaultTimestampWrapper from "src/components/TimestampWrapper";
import DefaultSpeechBubbleTimestamp from "./TimestampStyled";
import clsx from "clsx";
import ConversationData from "src/data/ConversationData";
import { ReactNode } from "react";
import getEnv from "src/Env";

function SpeechBubbleAudioBase({
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
    const env = getEnv();

    let element: ReactNode;
    if (!file) {
        element = `Unrecognized file key: ${message.src}`;
    } else if (file.type !== "audio") {
        throw new Error(`Unable to render audio message with non-audio file type: ${file.type}`);
    } else {
        element = (
            <AudioPlayer
                src={file.url.replace("$target", env.apiUrl)}
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

export function applySubComponents<
    T extends typeof SpeechBubbleAudioBase
>(C: T) {
    return Object.assign(C, {
        AudioPlayer: DefaultAudioPlayer,
        ScreenReaderText: DefaultScreenReaderText,
        TimestampWrapper: DefaultTimestampWrapper,
        SpeechBubbleTimestamp: DefaultSpeechBubbleTimestamp
    });
}

export default applySubComponents(SpeechBubbleAudioBase);