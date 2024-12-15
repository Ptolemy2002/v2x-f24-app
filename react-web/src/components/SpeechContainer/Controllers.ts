import useManualErrorHandling from "@ptolemy2002/react-manual-error-handling";
import { useMountEffect } from "@ptolemy2002/react-mount-effects";
import { useCallback, useEffect, useRef } from "react";
import ConversationData from "src/data/ConversationData";
import useAppSearchParamState from "src/SearchParams";

export function useSpeechContainerController() {
    const speechContainerRef = useRef<HTMLDivElement>(null);
    const { _try } = useManualErrorHandling();

    const [_conversationData] = ConversationData.useContext(["messages", "requestInProgress", "requestFailed"]);
    const conversationData = _conversationData!;

    const { convo: convoId, setConvo: setConvoId } = useAppSearchParamState();

    // If there is no last request, pull the initial data.
    useMountEffect(() => {
        if (!conversationData.hasLastRequest()) {
            // _try will allow the error boundary we set up to catch if this fails.
            _try(() => conversationData.pull(convoId));
        }
    });

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

    return {
        speechContainerRef,
        _try,
        conversationData,
        scrollToEnd,
        convoId, setConvoId
    };
}