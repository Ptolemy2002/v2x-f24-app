import { Button } from 'react-bootstrap';
import DefaultRightArrowIcon from 'src/components/icons/RightArrowIcon';
import { InputContainerProps } from './Types';
import { useInputContainerController } from './Controllers';

export default function InputContainerBase({
    RightArrowIcon = DefaultRightArrowIcon,
    ...props
}: InputContainerProps["functional"]) {
    const {
        messageInputRef,
        keyDownHandler,
        addText,
        sendDisabled
    } = useInputContainerController();

    return (
        <div id="input-container" {...props}>
            <textarea
                ref={messageInputRef} // This ref property will set messageInputRef.current to the textarea element.
                className="input"
                id="message-input"
                placeholder="Type a message..."
                onKeyDown={keyDownHandler}
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