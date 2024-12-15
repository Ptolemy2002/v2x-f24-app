import { KeyboardEvent, useCallback, useMemo, useRef } from "react";
import { createMessage } from "shared";
import ConversationData from "src/data/ConversationData";

export function useInputContainerController() {
    // This ref is used to allow access to the message content through the textarea element.
    const messageInputRef = useRef<HTMLTextAreaElement>(null);

    const [_conversationData] = ConversationData.useContext(["requestInProgress", "requestFailed"]);
    const conversationData = _conversationData!;

    // useCallback is used to keep a stable reference to the function.
    const addText = useCallback(() => {
        conversationData.addMessage(createMessage("text", "sender", () => {
            // We do this in a timeout to fix a bug in strict mode where the text comes up empty the second time this
            // code is run. In non-strict mode, the bug doesn't happen.
            setTimeout(() => {
                // The ! here tells TypeScript that messageInputRef.current will not be null in this context.
                // It doesn't see that we have the ref set to the textarea element in JSX.
                messageInputRef.current!.value = "";
            }, 0);

            return { text: messageInputRef.current!.value };
        }));

        // Start the bot's response
        conversationData.queryBot();
    }, [conversationData]);

    const addImage = useCallback(() => {
        conversationData.addMessage(createMessage("image", "sender", () => ({
            // Just a placeholder image for now.
            src: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
            alt: "Placeholder image"
        })));

        // Start the bot's response
        conversationData.queryBot();
    }, [conversationData, conversationData.requestInProgress, conversationData.requestFailed]);

    const addAudio = useCallback(() => {
        conversationData.addMessage(createMessage("audio", "sender", () => ({
            // Just a placeholder audio for now.
            src: "/aud-test.wav"
        })));

        // Start the bot's response
        conversationData.queryBot();
    }, [conversationData]);

    const sendDisabled = useMemo(() => {
        return (
            conversationData.requestInProgress
            || conversationData.hasFailedRequest("queryBot")
        );
    }, [
        conversationData,
        conversationData.requestInProgress,
        conversationData.requestFailed
    ]);

    // useCallback is used to keep a stable reference to the function.
    const keyDownHandler = useCallback((event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            if (!sendDisabled) addText();
        } else if (event.ctrlKey) {
            // Send an image when the user presses Control + I and an audio when the user presses Control + M.
            if (event.key === 'i') {
                event.preventDefault();
                if (!sendDisabled) addImage();
            } else if (event.key === 'm') {
                event.preventDefault();
                if (!sendDisabled) addAudio();
            }
        }
    }, [addText, addImage, addAudio, sendDisabled]);

    return {
        conversationData,
        messageInputRef,
        keyDownHandler,
        sendDisabled,
        addText,
        addImage,
        addAudio
    };
}