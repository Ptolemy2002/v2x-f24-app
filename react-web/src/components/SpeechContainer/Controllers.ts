import useManualErrorHandling from "@ptolemy2002/react-manual-error-handling";
import { useDelayedEffect } from "@ptolemy2002/react-mount-effects";
import { useCallback, useEffect, useRef } from "react";
import ConversationInfo from "src/context/ConversationInfo";
import ConversationData from "src/data/ConversationData";
import useAppSearchParamState from "src/SearchParams";

export function useSpeechContainerController() {
    const speechContainerRef = useRef<HTMLDivElement>(null);
    const { _try } = useManualErrorHandling();

    const [conversationData] = ConversationData.useContextNonNullable(["messages", "requestInProgress", "requestFailed"]);
    const [conversationInfo] = ConversationInfo.useContext();

    const { convo: convoId, setConvo: setConvoId } = useAppSearchParamState();

    // If there is no last request, pull the initial data.
    useEffect(() => {
        if (!conversationData.hasLastRequest()) {
            // _try will allow the error boundary we set up to catch if this fails.
            _try(() => conversationData.pull());
        }
    }, [conversationData]);

    // useCallback is used to keep a stable reference to the function.
    const scrollToEnd = useCallback(() => {
        // The ! here tells TypeScript that messageInputRef.current will not be null in this context.
        // It doesn't see that we have the ref set to the div element in JSX.
        speechContainerRef.current!.scrollTop = speechContainerRef.current!.scrollHeight;
    }, []);

    // When a text message is added, scroll to the end automatically. The onLoad solution used for images
    // and audio messages doesn't work for text messages, so this is necessary.
    useEffect(() => {
        if (conversationData.messages.length > 0 && conversationData.getLastMessage()?.type === "text") {
            scrollToEnd();
        }
    }, [conversationData.messages, scrollToEnd, conversationData]);

    // When queryBot is in progress, scroll to the end automatically.
    useEffect(() => {
        if (conversationData.hasInProgressRequest("queryBot")) {
            scrollToEnd();
        }
    }, [conversationData.requestInProgress, scrollToEnd, conversationData]);

    // When messages change, update the modifiedAt field in the conversationInfo context.
    useDelayedEffect(() => {
        conversationInfo.updateEntry(
            conversationData.id,
            () => ({modifiedAt: conversationData.getLastModified().toISOString()})
        );
    }, [conversationData.messages], 1);

    return {
        speechContainerRef,
        _try,
        conversationData,
        conversationInfo,
        scrollToEnd,
        convoId, setConvoId
    };
}