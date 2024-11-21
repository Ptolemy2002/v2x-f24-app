import clsx from "clsx";
import ConversationData from "src/data/ConversationData";
import DefaultSpeechContainer from "src/components/SpeechContainer";
import DefaultInputContainer from "src/components/InputContainer";
import { ConversationContainerProps } from "./Types";
import useAppSearchParamState from "src/SearchParams";

export default function ConversationContainer({
    className,
    SpeechContainer = DefaultSpeechContainer,
    InputContainer = DefaultInputContainer,
    ...props
}: ConversationContainerProps) {
    const { convo: convoId } = useAppSearchParamState();

    if (convoId === null) {
        return (
            <div id="conversation-container" className={clsx("col", className)} {...props}>
                No conversation selected.
            </div>
        );
    }
    
    return (
        // When the key changes, the element is re-created. This will allow the instance to be reset
        // so that the data for the new conversation is fetched.
        <ConversationData.Provider
            key={convoId}
            value={{_id: convoId}}

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