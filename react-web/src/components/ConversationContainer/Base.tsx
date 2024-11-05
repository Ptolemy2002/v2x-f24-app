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

            // This is necessary so that the children are re-evaluated when any values affecting
            // them change. The memo function prevents React's default behavior to handle this,
            // as it causes unnecessary re-renders.
            renderDeps={[SpeechContainer, InputContainer, className, ...Object.values(props)]}
        >
            <div id="conversation-container" className={clsx("col", className)} {...props}>
                <SpeechContainer />
                <InputContainer />
            </div>
        </ConversationData.Provider>
    );
}