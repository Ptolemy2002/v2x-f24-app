import { InputContainerProps } from './Types';
import { useInputContainerController } from './Controllers';
import DefaultSendButton from './SendButton';
import DefaultUploadButton from './UploadButton';
import DefaultRightArrowIcon from 'src/components/icons/RightArrowIcon';
import DefaultUploadIcon from 'src/components/icons/UploadIcon';

export default function InputContainerBase({
    SendButton=DefaultSendButton,
    UploadButton=DefaultUploadButton,
    RightArrowIcon=DefaultRightArrowIcon,
    UploadIcon=DefaultUploadIcon,
    ...props
}: InputContainerProps["functional"]) {
    const {
        messageInputRef,
        keyDownHandler,
        addText,
        sendDisabled,
        onMessageInputChanged
    } = useInputContainerController();

    return (
        <div id="input-container" {...props}>
            <textarea
                ref={messageInputRef} // This ref property will set messageInputRef.current to the textarea element.
                className="input"
                id="message-input"
                placeholder="Type a message..."
                onKeyDown={keyDownHandler}
                onChange={onMessageInputChanged}
            ></textarea>

            <UploadButton>
                <UploadIcon />
            </UploadButton>
            
            <SendButton onClick={addText} disabled={sendDisabled}>
                <RightArrowIcon />
            </SendButton>
        </div>
    );
}