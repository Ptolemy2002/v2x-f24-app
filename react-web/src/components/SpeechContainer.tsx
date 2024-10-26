import { HTMLProps, useCallback, useEffect, useRef } from "react";
import { SpeechBubbleText, SpeechBubbleImage, SpeechBubbleAudio, SpeechBubbleMessage } from "src/components/SpeechBubble";
import { RequiredCSSProperties } from "src/Style";
import styled from "styled-components";

// SpeechContainer will take an array of messages as well as the default props for a div element.
export type SpeechContainerProps = {
    messages: SpeechBubbleMessage[];
} & HTMLProps<HTMLDivElement>;

// ...props here will contain any additional props we haven't explicitly consumed.
function _SpeechContainer({messages=[], ...props}: SpeechContainerProps) {
    const speechContainerRef = useRef<HTMLDivElement>(null);

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