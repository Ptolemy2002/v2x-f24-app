import {useRef, useState, useEffect, useCallback} from "react";
import {
    SpeechBubbleText as DefaultSpeechBubbleText,
    SpeechBubbleImage as DefaultSpeechBubbleImage,
    SpeechBubbleAudio as DefaultSpeechBubbleAudio,
    SpeechBubbleTyping as DefaultSpeechBubbleTyping,
} from "src/components/SpeechBubble";
import { SpeechContainerProps } from "./Types";
import { respond } from "./Other";

export default function({
    messages=[],
    setMessages,
    SpeechBubbleText=DefaultSpeechBubbleText,
    SpeechBubbleImage=DefaultSpeechBubbleImage,
    SpeechBubbleAudio=DefaultSpeechBubbleAudio,
    SpeechBubbleTyping=DefaultSpeechBubbleTyping,
    ...props
}: SpeechContainerProps) {
    const speechContainerRef = useRef<HTMLDivElement>(null);
    const [showTypingBubbles, setShowTypingBubbles] = useState(false);

    // useCallback is used to keep a stable reference to the function.
    const scrollToEnd = useCallback(() => {
        // The ! here tells TypeScript that messageInputRef.current will not be null in this context.
        // It doesn't see that we have the ref set to the div element in JSX.
        speechContainerRef.current!.scrollTop = speechContainerRef.current!.scrollHeight;
    }, []);

    // When a text message is added, scroll to the end automatically. The onLoad solution used for images
    // and audio messages doesn't work for text messages, so this is necessary.
    useEffect(() => {
        if (messages.length > 0 && messages[messages.length - 1].type === "text") {
            scrollToEnd();
        }
    }, [messages, scrollToEnd]);

    // When the sender adds a message, start responding with typing bubbles.
    useEffect(() => {
        const lastMessage = messages[messages.length - 1];
        if (messages.length > 0 && lastMessage.origin === "sender") {
            setShowTypingBubbles(true);

            // Use setTimeout here to simulate a delay in the response.
            // We're waiting between 1 and 5 seconds before responding.
            setTimeout(() => {
                setShowTypingBubbles(false);
                setMessages(respond(messages));
            }, Math.random() * 4000 + 1000);
        }
    }, [messages]);

    // When showTypingBubbles changes to true, scroll to the end of the container.
    useEffect(() => {
        if (showTypingBubbles) {
            scrollToEnd();
        }
    }, [showTypingBubbles, scrollToEnd]);

    return (
        <div id="speech-container" ref={speechContainerRef} {...props}>
            {
                // map here will iterate over each message in the messages array, returning a new array with the
                // results of the function applied to each element.
                messages.map((message, i) => {
                    if (message.type === "text") {
                        return <SpeechBubbleText key={`text-${i}`} message={message} />;
                    } else if (message.type === "image") {
                        return <SpeechBubbleImage key={`img-${i}`} message={message} scrollToEnd={scrollToEnd} />;
                    } else if (message.type === "audio") {
                        return <SpeechBubbleAudio key={`aud-${i}`} message={message} scrollToEnd={scrollToEnd} />;
                    }
                })
            }

            {showTypingBubbles && <SpeechBubbleTyping origin="recepient" />}
        </div>
    );
}