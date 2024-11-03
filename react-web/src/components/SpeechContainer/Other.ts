import defaultResponses from "src/data/default-responses.json";
import { addMessage, SpeechBubbleMessage } from "src/components/SpeechBubble";
import { ResponseData } from "./Types";

export function cleanText(text: string): string {
    // Convert to lowercase
    text = text.toLowerCase();
    // Replace non-alphanumeric characters with spaces
    text = text.replace(/[^a-z0-9]/g, " ");
    // Replace multiple spaces with a single space
    text = text.replace(/\s+/g, " ");
    // Remove leading and trailing whitespace
    text = text.trim();
    return text;
}

export function findMatchingResponse(text: string): ResponseData | null {
    text = cleanText(text);
    for (const response of defaultResponses.other) {
        for (const trigger of (response.triggers ?? [])) {
            if (text.includes(trigger)) {
                return response;
            }
        }
    }

    return null;
}

export function respond(messages: SpeechBubbleMessage[]): SpeechBubbleMessage[] {
    const lastMessage = messages[messages.length - 1];
    
    let response: ResponseData = defaultResponses["[default]"];
    if (lastMessage.type === "image") {
        response = defaultResponses["[image]"];
    } else if (lastMessage.type === "audio") {
        response = defaultResponses["[audio]"];
    } else {
        const matchingResponse = findMatchingResponse(lastMessage.text);
        if (matchingResponse) {
            response = matchingResponse;
        }
    }

    if (response.type === "text") {
        return addMessage(messages, "text", "recepient", () => ({
            text: response.text ?? "[No text provided]"
        }));
    } else if (response.type === "image") {
        if (!response.src) {
            return addMessage(messages, "text", "recepient", () => ({
                text: "I'm sorry, I had trouble sending an image."
            }));
        } else {
            return addMessage(messages, "image", "recepient", () => ({
                src: response.src!,
                alt: response.alt ?? "[No alt text provided]"
            }));
        }
    } else if (response.type === "audio") {
        if (!response.src) {
            return addMessage(messages, "text", "recepient", () => ({
                text: "I'm sorry, I had trouble sending an audio message."
            }));
        } else {
            return addMessage(messages, "audio", "recepient", () => ({
                src: response.src!
            }));
        }
    }

    return messages;
}