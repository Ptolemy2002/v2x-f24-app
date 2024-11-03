import {useState} from "react";
import clsx from "clsx";
import { SpeechBubbleMessage } from "src/components/SpeechBubble";
import DefaultSpeechContainer from "src/components/SpeechContainer";
import DefaultInputContainer from "src/components/InputContainer";
import { ConversationContainerProps } from "./Types";

export default function({
    className,
    SpeechContainer = DefaultSpeechContainer,
    InputContainer = DefaultInputContainer,
    ...props
}: ConversationContainerProps) {
    const [messages, setMessages] = useState<SpeechBubbleMessage[]>([
        {origin: "recepient", type: "text", text: "Hello! How can I assist you today?", date: new Date()},
    ]);

    return (
        <div id="conversation-container" className={clsx("col", className)} {...props}>
            <SpeechContainer messages={messages} setMessages={setMessages} />
            <InputContainer setMessages={setMessages} />
        </div>
    );
}