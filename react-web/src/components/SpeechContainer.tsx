import { HTMLProps, useCallback, useRef } from "react";
import { SpeechBubbleText, SpeechBubbleImage, SpeechBubbleMessage } from "src/components/SpeechBubble";

export type SpeechContainerProps = {
    messages: SpeechBubbleMessage[];
} & HTMLProps<HTMLDivElement>;

export default function SpeechContainer({messages=[],...props}: SpeechContainerProps) {
    const speechContainerRef = useRef<HTMLDivElement>(null);
    const scrollToEnd = useCallback(() => {
        speechContainerRef.current!.scrollTop = speechContainerRef.current!.scrollHeight;
    }, []);

    return (
        <div id="speech-container" ref={speechContainerRef} {...props}>
            {messages.map((message, i) => {
                if (message.type === "text") {
                    return <SpeechBubbleText key={i} message={message} />;
                } else {
                    return <SpeechBubbleImage key={i} message={message} scrollToEnd={scrollToEnd} />;
                }
            })}
        </div>
    );
}