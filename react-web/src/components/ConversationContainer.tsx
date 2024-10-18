import clsx from "clsx";
import { HTMLProps, useState } from "react"
import { SpeechBubbleMessage } from "./SpeechBubble";
import SpeechContainer from "./SpeechContainer";
import InputContainer from "./InputContainer";

export default function ConversationContainer({className, ...props}: HTMLProps<HTMLDivElement>) {
    const [messages, setMessages] = useState<SpeechBubbleMessage[]>([
        {origin: "recepient", type: "text", text: "Hello, how are you?"}
    ]);

    return (
        <div id="conversation-container" className={clsx("col", className)} {...props}>
            <SpeechContainer messages={messages} />
            <InputContainer setMessages={setMessages} />
        </div>
    );
}