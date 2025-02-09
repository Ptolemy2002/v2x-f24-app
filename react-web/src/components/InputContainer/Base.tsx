import { InputContainerProps } from './Types';
import { useInputContainerController } from './Controllers';
import DefaultSendButton from './SendButtonStyled';
import DefaultUploadButton from './UploadButtonStyled';

export default function InputContainerBase({
    SendButton=DefaultSendButton,
    UploadButton=DefaultUploadButton,
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

            <UploadButton />
            <SendButton onClick={addText} disabled={sendDisabled} />
        </div>
    );
}