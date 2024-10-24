import clsx from "clsx";
import { HTMLProps, useState } from "react"
import { SpeechBubbleMessage } from "src/components/SpeechBubble";
import SpeechContainer from "src/components/SpeechContainer";
import InputContainer from "src/components/InputContainer";
import { CONVERSATION_PADDING } from "src/Style";
import styled from "styled-components";

function _ConversationContainer({className, ...props}: HTMLProps<HTMLDivElement>) {
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

const ConversationContainer = styled(_ConversationContainer)`
    display: flex;
    flex-direction: column;
    padding: ${CONVERSATION_PADDING};
`;
ConversationContainer.displayName = "ConversationContainer";
export default ConversationContainer;