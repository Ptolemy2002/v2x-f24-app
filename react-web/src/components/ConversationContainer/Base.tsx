import clsx from "clsx";
import ConversationData from "src/data/ConversationData";
import DefaultSpeechContainer from "src/components/SpeechContainer";
import DefaultInputContainer from "src/components/InputContainer";
import { ConversationContainerProps } from "./Types";
import useAppSearchParamState from "src/SearchParams";
import { ErrorBoundary } from "react-error-boundary";

export default function ConversationContainerBase({
    className,
    SpeechContainer = DefaultSpeechContainer,
    InputContainer = DefaultInputContainer,
    ...props
}: ConversationContainerProps["functional"]) {
    const { convo: convoId } = useAppSearchParamState();

    if (convoId === null) {
        return (
            <div id="conversation-container" className={clsx("col", "not-selected", className)} {...props}>
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
                <ErrorBoundary fallback={<div className="error">An error occured loading the conversation.</div>}>
                    <SpeechContainer />
                    <InputContainer />
                </ErrorBoundary>
            </div>
        </ConversationData.Provider>
    );
}