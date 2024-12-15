import {
    SpeechBubbleText as DefaultSpeechBubbleText,
    SpeechBubbleImage as DefaultSpeechBubbleImage,
    SpeechBubbleAudio as DefaultSpeechBubbleAudio,
    SpeechBubbleTyping as DefaultSpeechBubbleTyping,
    SpeechBubbleDanger as DefaultSpeechBubbleDanger
} from "src/components/SpeechBubble";
import { SpeechContainerProps } from "./Types";
import clsx from "clsx";
import { useSpeechContainerController } from "./Controllers";

export default function SpeechContainerBase({
    SpeechBubbleText=DefaultSpeechBubbleText,
    SpeechBubbleImage=DefaultSpeechBubbleImage,
    SpeechBubbleAudio=DefaultSpeechBubbleAudio,
    SpeechBubbleTyping=DefaultSpeechBubbleTyping,
    SpeechBubbleDanger=DefaultSpeechBubbleDanger,
    ...props
}: SpeechContainerProps) {
    const {
        speechContainerRef,
        conversationData,
        scrollToEnd
    } = useSpeechContainerController();

    if (conversationData.hasInProgressRequest("pull")) {
        return (
            <div id="speech-container" ref={speechContainerRef} {...props} className={clsx("loading", props.className)}>
                Loading Conversation Data...
            </div>
        );
    }

    return (
        <div id="speech-container" ref={speechContainerRef} {...props}>
            {
                // map here will iterate over each message in the messages array, returning a new array with the
                // results of the function applied to each element.
                conversationData.messages.map((message) => {
                    if (message.type === "text") {
                        return <SpeechBubbleText key={message.id} message={message} />;
                    } else if (message.type === "image") {
                        return <SpeechBubbleImage key={message.id} message={message} scrollToEnd={scrollToEnd} />;
                    } else if (message.type === "audio") {
                        return <SpeechBubbleAudio key={message.id} message={message} scrollToEnd={scrollToEnd} />;
                    }
                })
            }

            {conversationData.hasInProgressRequest("queryBot") && <SpeechBubbleTyping origin="recepient" />}
            {conversationData.hasFailedRequest("queryBot") && <SpeechBubbleDanger origin="recepient" date={new Date()} />}
        </div>
    );
}