import clsx from "clsx";
import ConversationData from "src/data/ConversationData";
import DefaultSpeechContainer from "src/components/SpeechContainer";
import DefaultInputContainer from "src/components/InputContainer";
import { ConversationContainerProps } from "./Types";

export default function({
    className,
    SpeechContainer = DefaultSpeechContainer,
    InputContainer = DefaultInputContainer,
    ...props
}: ConversationContainerProps) {
    return (
        <ConversationData.Provider value={{
            messages: [
                {
                    origin: "recepient",
                    type: "text",
                    text: "Hello! How can I assist you today?",
                    date: (new Date()).toISOString()
                }
            ]
        }}
        >
            <div id="conversation-container" className={clsx("col", className)} {...props}>
                <SpeechContainer />
                <InputContainer />
            </div>
        </ConversationData.Provider>
    );
}