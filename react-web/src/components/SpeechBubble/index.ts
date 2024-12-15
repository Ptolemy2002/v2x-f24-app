// Since this is index.tsx, importing the folder itself will import this file.
// Don't put any other code in this file, just export the necessary resources.
import _UnstyledSpeechBubbleText from "./Text";
import _SpeechBubbleText from "./TextStyled";
import _UnstyledSpeechBubbleImage from "./Image";
import _SpeechBubbleImage from "./ImageStyled";
import _UnstyledSpeechBubbleAudio from "./Audio";
import _SpeechBubbleAudio from "./AudioStyled";
import _UnstyledSpeechBubbleTyping from "./Typing";
import _SpeechBubbleTyping from "./TypingStyled";
import _UnstyledSpeechBubbleDanger from "./Danger";
import _SpeechBubbleDanger from "./DangerStyled";
import _UnstyledSpeechBubbleTimestamp from "./Timestamp";
import _SpeechBubbleTimestamp from "./TimestampStyled";
import _UnstyledRetryLink from "./RetryLink";
import _RetryLink from "./RetryLinkStyled";
import _ScreenReaderText from "./ScreenReaderText";
import _DangerScreenReaderText from "./DangerScreenReaderText";


export const UnstyledSpeechBubbleText = Object.assign(_UnstyledSpeechBubbleText, {
    Timestamp: _UnstyledSpeechBubbleTimestamp,
    ScreenReaderText: _ScreenReaderText
});
export const SpeechBubbleText = Object.assign(_SpeechBubbleText, {
    Timestamp: _SpeechBubbleTimestamp,
    ScreenReaderText: _ScreenReaderText
});

export const UnstyledSpeechBubbleImage = Object.assign(_UnstyledSpeechBubbleImage, {
    Timestamp: _UnstyledSpeechBubbleTimestamp,
    ScreenReaderText: _ScreenReaderText
});
export const SpeechBubbleImage = Object.assign(_SpeechBubbleImage, {
    Timestamp: _SpeechBubbleTimestamp,
    ScreenReaderText: _ScreenReaderText
});

export const UnstyledSpeechBubbleAudio = Object.assign(_UnstyledSpeechBubbleAudio, {
    Timestamp: _UnstyledSpeechBubbleTimestamp,
    ScreenReaderText: _ScreenReaderText
});
export const SpeechBubbleAudio = Object.assign(_SpeechBubbleAudio, {
    Timestamp: _SpeechBubbleTimestamp,
    ScreenReaderText: _ScreenReaderText
});

export const UnstyledSpeechBubbleTyping = Object.assign(_UnstyledSpeechBubbleTyping, {
    ScreenReaderText: _ScreenReaderText
});
export const SpeechBubbleTyping = Object.assign(_SpeechBubbleTyping, {
    ScreenReaderText: _ScreenReaderText
});

export const UnstyledSpeechBubbleDanger = Object.assign(_UnstyledSpeechBubbleDanger, {
    Timestamp: _UnstyledSpeechBubbleTimestamp,
    ScreenReaderText: _DangerScreenReaderText,
    RetryLink: _UnstyledRetryLink
});
export const SpeechBubbleDanger = Object.assign(_SpeechBubbleDanger, {
    Timestamp: _SpeechBubbleTimestamp,
    ScreenReaderText: _DangerScreenReaderText,
    RetryLink: _RetryLink
});

export {default as UnstyledSpeechBubbleTimestamp} from "./Timestamp";
export {default as SpeechBubbleTimestamp} from "./TimestampStyled";

export {default as UnstyledRetryLink} from "./RetryLink";
export {default as RetryLink} from "./RetryLinkStyled";

export {default as ScreenReaderText} from "./ScreenReaderText";
export {default as DangerScreenReaderText} from "./DangerScreenReaderText";

// Export the types and other resources.
export * from "./Types";
export * from "./Other";
export * from "./Controllers";