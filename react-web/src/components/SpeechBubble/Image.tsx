import { SpeechBubbleImageProps } from "./Types";
import DefaultTimestampWrapper from "src/components/TimestampWrapper";
import DefaultSpeechBubbleTimestamp from "./TimestampStyled";
import DefaultScreenReaderText from "./ScreenReaderText";
import clsx from "clsx";
import ConversationData from "src/data/ConversationData";
import { ReactNode } from "react";

function SpeechBubbleImageBase({
    message,
    scrollToEnd,
    className,
    TimestampWrapper = DefaultTimestampWrapper,
    ScreenReaderText = DefaultScreenReaderText,
    SpeechBubbleTimestamp = DefaultSpeechBubbleTimestamp,
    ...props
}: SpeechBubbleImageProps["functional"]) {
    const [conversation] = ConversationData.useContextNonNullable(["files"]);
    const file = conversation.files[message.src];

    let element: ReactNode;
    if (!file) {
        element = `Unrecognized file key: ${message.src}`;
    } else if (file.type !== "image") {
        throw new Error(`Unable to render image message with non-image file type: ${file.type}`);
    } else {
        element = (
            <img
                onLoad={scrollToEnd}
                src={file.url}
                alt={message.alt ?? file.alt}
            />
        );
    }

    return (
        <div
            className={clsx("speech-bubble-img", message.origin, className)}
            {...props} // Pass any additional props to the element itself.
        >
            <TimestampWrapper date={message.date} updateInterval={10} render={(text) => <SpeechBubbleTimestamp text={text} />} />
            <div className={`speech-bubble-content ${message.origin}`}>
                <ScreenReaderText origin={message.origin} text="sent an image" />
                {element}
            </div>
        </div>
    );
}

export function applySubComponents<
    T extends typeof SpeechBubbleImageBase
>(C: T) {
    return Object.assign(C, {
        TimestampWrapper: DefaultTimestampWrapper,
        SpeechBubbleTimestamp: DefaultSpeechBubbleTimestamp,
        ScreenReaderText: DefaultScreenReaderText,
    });
}

export default applySubComponents(SpeechBubbleImageBase);