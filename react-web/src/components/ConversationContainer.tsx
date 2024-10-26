import clsx from "clsx";
import { HTMLProps, useState } from "react"
import { SpeechBubbleMessage } from "src/components/SpeechBubble";
import SpeechContainer from "src/components/SpeechContainer";
import InputContainer from "src/components/InputContainer";
import { RequiredCSSProperties } from "src/Style";
import styled from "styled-components";

function _ConversationContainer({className, ...props}: HTMLProps<HTMLDivElement>) {
    const [messages, setMessages] = useState<SpeechBubbleMessage[]>([
        {origin: "recepient", type: "text", text: "Hello, how are you?", date: new Date()},
    ]);

    return (
        <div id="conversation-container" className={clsx("col", className)} {...props}>
            <SpeechContainer messages={messages} setMessages={setMessages} />
            <InputContainer setMessages={setMessages} />
        </div>
    );
}

export type ConversationContainerStyleAttributes = {
    $padding?: RequiredCSSProperties["padding"];
};
const ConversationContainer = styled(_ConversationContainer).attrs<ConversationContainerStyleAttributes>(
    (props) => ({
        $padding: props.$padding ?? "10px",
    })
)`
    display: flex;
    flex-direction: column;
    padding: ${({$padding}) => $padding};
`;
ConversationContainer.displayName = "ConversationContainer";
export default ConversationContainer;