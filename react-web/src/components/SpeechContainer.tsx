import { HTMLProps, useCallback, useEffect, useRef, useState, Dispatch } from "react";
import { SpeechBubbleText, SpeechBubbleImage, SpeechBubbleAudio, SpeechBubbleMessage, SpeechBubbleTyping, addMessage } from "src/components/SpeechBubble";
import { RequiredCSSProperties } from "src/Style";
import styled from "styled-components";
import defaultResponses from "src/data/default-responses.json";

type ResponseData = {
    type: string;
    text?: string;
    src?: string;
    alt?: string;
};

function cleanText(text: string): string {
    // Convert to lowercase
    text = text.toLowerCase();
    // Replace non-alphanumeric characters with spaces
    text = text.replace(/[^a-z0-9]/g, " ");
    // Replace multiple spaces with a single space
    text = text.replace(/\s+/g, " ");
    // Remove leading and trailing whitespace
    text = text.trim();
    return text;
}

function respond(messages: SpeechBubbleMessage[]): SpeechBubbleMessage[] {
    const lastMessage = messages[messages.length - 1];
    
    let response: ResponseData = defaultResponses["[default]"];
    if (lastMessage.type === "image") {
        response = defaultResponses["[image]"];
    } else if (lastMessage.type === "audio") {
        response = defaultResponses["[audio]"];
    } else {
        const cleanedText = cleanText(lastMessage.text);
        if (cleanedText in defaultResponses) {
            response = defaultResponses[cleanedText as keyof typeof defaultResponses];
        }
    }

    if (response.type === "text") {
        return addMessage<"text">(messages, "text", "recepient", () => ({
            text: response.text ?? "[No text provided]"
        }));
    } else if (response.type === "image") {
        return addMessage<"image">(messages, "image", "recepient", () => ({
            src: response.src ?? "[No image provided]",
            alt: response.alt ?? "[No alt text provided]"
        }));
    } else if (response.type === "audio") {
        return addMessage<"audio">(messages, "audio", "recepient", () => ({
            src: response.src ?? "[No audio provided]"
        }));
    }

    return messages;
}

// SpeechContainer will take an array of messages as well as the default props for a div element.
export type SpeechContainerProps = {
    messages: SpeechBubbleMessage[];
    setMessages: Dispatch<SpeechBubbleMessage[]>;
} & HTMLProps<HTMLDivElement>;

// ...props here will contain any additional props we haven't explicitly consumed.
function _SpeechContainer({messages=[], setMessages, ...props}: SpeechContainerProps) {
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

export type SpeechContainerStyleAttributes = {
    $marginBottom?: RequiredCSSProperties["marginBottom"];
    $gap?: RequiredCSSProperties["gap"];
};
const SpeechContainer = styled(_SpeechContainer).attrs<SpeechContainerStyleAttributes>(
    (props) => ({
        $marginBottom: props.$marginBottom ?? "20px",
        $gap: props.$gap ?? "10px",
    })
)`
    // Scroll if the content is too tall, but don't show the scrollbar if it's not needed.
    overflow-y: auto;
    flex-grow: 1;
    margin-bottom: ${({$marginBottom}) => $marginBottom};

    display: flex;
    flex-direction: column;
    gap: ${({$gap}) => $gap};
`;
SpeechContainer.displayName = "SpeechContainer";
export default SpeechContainer;