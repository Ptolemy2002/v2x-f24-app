import { useCallback, useRef, KeyboardEvent, useMemo } from 'react';
import { Button } from 'react-bootstrap';
import DefaultRightArrowIcon from 'src/components/icons/RightArrowIcon';
import { InputContainerProps } from './Types';
import ConversationData from 'src/data/ConversationData';
import { createMessage } from 'shared';

export default function InputContainerBase({
    RightArrowIcon = DefaultRightArrowIcon,
    ...props
}: InputContainerProps) {
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
    const handleKeyDown = useCallback((event: KeyboardEvent<HTMLTextAreaElement>) => {
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

    return (
        <div id="input-container" {...props}>
            <textarea
                ref={messageInputRef} // This ref property will set messageInputRef.current to the textarea element.
                className="input"
                id="message-input"
                placeholder="Type a message..."
                onKeyDown={handleKeyDown}
            ></textarea>

            <Button
                id="send-button"
                className="send-button"
                as="button"
                aria-label="Send Message"
                onClick={addText}
                disabled={sendDisabled}
            >
                <RightArrowIcon />
            </Button>
        </div>
    );
}