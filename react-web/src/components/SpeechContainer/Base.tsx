import {useRef, useEffect, useCallback} from "react";
import {
    SpeechBubbleText as DefaultSpeechBubbleText,
    SpeechBubbleImage as DefaultSpeechBubbleImage,
    SpeechBubbleAudio as DefaultSpeechBubbleAudio,
    SpeechBubbleTyping as DefaultSpeechBubbleTyping,
} from "src/components/SpeechBubble";
import { SpeechContainerProps } from "./Types";
import ConversationData from "src/data/ConversationData";

export default function SpeechContainer({
    SpeechBubbleText=DefaultSpeechBubbleText,
    SpeechBubbleImage=DefaultSpeechBubbleImage,
    SpeechBubbleAudio=DefaultSpeechBubbleAudio,
    SpeechBubbleTyping=DefaultSpeechBubbleTyping,
    ...props
}: SpeechContainerProps) {
    const speechContainerRef = useRef<HTMLDivElement>(null);

    const [_conversationData] = ConversationData.useContext(["messages", "requestInProgress"]);
    const conversationData = _conversationData!;

    // useCallback is used to keep a stable reference to the function.
    const scrollToEnd = useCallback(() => {
        // The ! here tells TypeScript that messageInputRef.current will not be null in this context.
        // It doesn't see that we have the ref set to the div element in JSX.
        speechContainerRef.current!.scrollTop = speechContainerRef.current!.scrollHeight;
    }, []);

    // When a text message is added, scroll to the end automatically. The onLoad solution used for images
    // and audio messages doesn't work for text messages, so this is necessary.
    useEffect(() => {
        if (conversationData.messages.length > 0 && conversationData.getLastMessage()?.type === "text") {
            scrollToEnd();
        }
    }, [conversationData.messages, scrollToEnd]);

    // When queryBot is in progress, scroll to the end automatically.
    useEffect(() => {
        if (conversationData.hasInProgressRequest("queryBot")) {
            scrollToEnd();
        }
    }, [conversationData.requestInProgress, scrollToEnd]);

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
        </div>
    );
}