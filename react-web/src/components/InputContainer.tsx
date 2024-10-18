import { Dispatch, HTMLProps, SetStateAction, KeyboardEvent, useCallback, useRef } from "react";
import { SpeechBubbleMessage } from "src/components/SpeechBubble";
import { Button } from "react-bootstrap";
import RightArrowIcon from "./icons/RightArrowIcon";

export type InputContainerProps = {
    setMessages: Dispatch<SetStateAction<SpeechBubbleMessage[]>>;
} & HTMLProps<HTMLDivElement>;

export default function InputContainer({setMessages, ...props}: InputContainerProps) {
    // This ref is used to allow access to the message content through the textarea element.
    const messageInputRef = useRef<HTMLTextAreaElement>(null);

    // useCallback is used to keep a stable reference to the function.
    const handleClick = useCallback(() => {
        setMessages((messages) => {
            const newMessages = [...messages];

            // If the current message is even, the sender is the recipient. Otherwise, the sender is the user.
            if (newMessages.length % 2 === 0) {
                newMessages.push({
                    origin: "recepient",
                    type: "text",
                    text: messageInputRef.current?.value ?? ""
                });
            } else {
                newMessages.push({
                    origin: "sender",
                    type: "text",
                    text: messageInputRef.current?.value ?? ""
                });
            }

            messageInputRef.current!.value = "";
            return newMessages;
        });
    }, [setMessages]); // Recreate the function only when setMessages changes.

    const addImage = useCallback(() => {
        setMessages((messages) => {
            const newMessages = [...messages];

            // If the current message is even, the sender is the recipient. Otherwise, the sender is the user.
            if (newMessages.length % 2 === 0) {
                newMessages.push({
                    origin: "recepient",
                    type: "image",
                    // Just a placeholder image for now.
                    src: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
                    alt: "Placeholder image"
                });
            } else {
                newMessages.push({
                    origin: "sender",
                    type: "image",
                    // Just a placeholder image for now.
                    src: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
                    alt: "Placeholder image"
                });
            }

            return newMessages;
        });
    }, [setMessages]);

    // useCallback is used to keep a stable reference to the function.
    const handleKeyDown = useCallback((event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleClick();
        } // Send an image when the user presses Control + I
        else if (event.key === 'i' && event.ctrlKey) {
            event.preventDefault();
            addImage();
        }
    }, []);

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
                onClick={handleClick}
            >
                <RightArrowIcon />
            </Button>
        </div>
    );
}