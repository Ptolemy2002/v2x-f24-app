import { SpeechBubbleImageProps } from "./Types";
import DefaultTimestampWrapper from "src/components/TimestampWrapper";
import DefaultSpeechBubbleTimestamp from "./TimestampStyled";
import DefaultScreenReaderText from "./ScreenReaderText";
import clsx from "clsx";
import ConversationData from "src/data/ConversationData";
import { ReactNode } from "react";
import getEnv from "src/Env";
import IMG from "src/components/IMG";

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
    const env = getEnv();

    let element: ReactNode;
    if (!file) {
        element = `Unrecognized file key: ${message.src}`;
    } else if (file.type !== "image") {
        throw new Error(`Unable to render image message with non-image file type: ${file.type}`);
    } else {
        element = (
            <IMG
                onLoad={scrollToEnd}
                srcSet={{
                    success: file.url.replace("$target", env.apiUrl),
                    loading: "/loading.gif"
                }}

                altSet={{
                    success: message.alt ?? file.alt,
                    loading: "Loading image..."
                }}
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