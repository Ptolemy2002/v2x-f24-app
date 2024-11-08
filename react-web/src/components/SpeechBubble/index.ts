// Since this is index.tsx, importing the folder itself will import this file.
// Don't put any other code in this file, just export the necessary resources.
export {default as UnstyledSpeechBubbleText} from "./Text";
export {default as SpeechBubbleText} from "./TextStyled";

export {default as UnstyledSpeechBubbleImage} from "./Image";
export {default as SpeechBubbleImage} from "./ImageStyled";

export {default as UnstyledSpeechBubbleAudio} from "./Audio";
export {default as SpeechBubbleAudio} from "./AudioStyled";

export {default as UnstyledSpeechBubbleTyping} from "./Typing";
export {default as SpeechBubbleTyping} from "./TypingStyled";

export {default as UnstyledSpeechBubbleTimestamp} from "./Timestamp";
export {default as SpeechBubbleTimestamp} from "./TimestampStyled";

export {default as ScreenReaderText} from "./ScreenReaderText";

// Export the types and other resources.
export * from "./Types";
export * from "./Other";