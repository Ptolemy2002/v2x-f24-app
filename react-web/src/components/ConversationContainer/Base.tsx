import clsx from "clsx";
import DefaultSpeechContainer from "src/components/SpeechContainer";
import DefaultInputContainer from "src/components/InputContainer";
import { ConversationContainerProps } from "./Types";
import useAppSearchParamState from "src/SearchParams";
import { ErrorBoundary } from "react-error-boundary";

function ConversationContainerBase({
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
        <div id="conversation-container" className={clsx("col", className)} {...props}>
            <ErrorBoundary fallback={<div className="error">An error occured loading the conversation.</div>} key={convoId}>
                <SpeechContainer />
                <InputContainer />
            </ErrorBoundary>
        </div>
    );
}
export function applySubComponents<
    T extends typeof ConversationContainerBase
>(C: T) {
    return Object.assign(C, {
        SpeechContainer: DefaultSpeechContainer,
        InputContainer: DefaultInputContainer,
    });
}

export default applySubComponents(ConversationContainerBase);