import { useCallback, useRef, KeyboardEvent } from 'react';
import { Button } from 'react-bootstrap';
import RightArrowIcon from 'src/components/icons/RightArrowIcon';
import { addMessage } from "src/components/SpeechBubble";
import { InputContainerProps } from './Types';

export default function({setMessages, ...props}: InputContainerProps) {
    // This ref is used to allow access to the message content through the textarea element.
    const messageInputRef = useRef<HTMLTextAreaElement>(null);

    // useCallback is used to keep a stable reference to the function.
    const addText = useCallback(() => {
        setMessages((messages) => {
            return addMessage(messages, "text", "sender", () => {
                // We do this in a timeout to fix a bug in strict mode where the text comes up empty the second time this
                // code is run. In non-strict mode, the bug doesn't happen.
                setTimeout(() => {
                    // The ! here tells TypeScript that messageInputRef.current will not be null in this context.
                    // It doesn't see that we have the ref set to the textarea element in JSX.
                    messageInputRef.current!.value = "";
                }, 0);

                return { text: messageInputRef.current!.value };
            });
        });
    }, [setMessages]); // Recreate the function only when setMessages changes.

    const addImage = useCallback(() => {
        setMessages((messages) => {
            return addMessage(messages, "image", "sender", () => ({
                // Just a placeholder image for now.
                src: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
                alt: "Placeholder image"
            }));
        });
    }, [setMessages]);

    const addAudio = useCallback(() => {
        setMessages((messages) => {
            return addMessage(messages, "audio", "sender", () => ({
                // Just a placeholder audio for now.
                src: "/aud-test.wav"
            }));
        });
    }, [setMessages]);

    // useCallback is used to keep a stable reference to the function.
    const handleKeyDown = useCallback((event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            addText();
        } else if (event.ctrlKey) {
            // Send an image when the user presses Control + I and an audio when the user presses Control + M.
            if (event.key === 'i') {
                event.preventDefault();
                addImage();
            } else if (event.key === 'm') {
                event.preventDefault();
                addAudio();
            }
        }
    }, [addText, addImage, addAudio]);

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
            >
                <RightArrowIcon />
            </Button>
        </div>
    );
}