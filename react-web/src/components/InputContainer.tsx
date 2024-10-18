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

    const handleClick = useCallback(() => {
        setMessages((messages) => {
            const newMessages = [...messages];

            // Evens are the sender, odds are the recipient.
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
    }, [setMessages]);

    const addImage = useCallback(() => {
        setMessages((messages) => {
            const newMessages = [...messages];

            // Evens are the sender, odds are the recipient.
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
                ref={messageInputRef}
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