import { HTMLProps, useCallback, useRef } from "react";
import { SpeechBubbleText, SpeechBubbleImage, SpeechBubbleAudio, SpeechBubbleMessage } from "src/components/SpeechBubble";

// SpeechContainer will take an array of messages as well as the default props for a div element.
export type SpeechContainerProps = {
    messages: SpeechBubbleMessage[];
} & HTMLProps<HTMLDivElement>;

// ...props here will contain any additional props we haven't explicitly consumed.
export default function SpeechContainer({messages=[],...props}: SpeechContainerProps) {
    const speechContainerRef = useRef<HTMLDivElement>(null);

    // useCallback is used to keep a stable reference to the function.
    const scrollToEnd = useCallback(() => {
        // The ! here tells TypeScript that messageInputRef.current will not be null in this context.
        // It doesn't see that we have the ref set to the div element in JSX.
        speechContainerRef.current!.scrollTop = speechContainerRef.current!.scrollHeight;
    }, []);

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
                        return <SpeechBubbleAudio key={`aud-${i}`} message={message} />;
                    }
                })
            }
        </div>
    );
}