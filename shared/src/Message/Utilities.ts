import {
    MessageOrigin,
    MongoTextMessage,
    TextMessage,
    TextMessageBase,
    ImageMessageBase,
    ImageMessage,
    MongoImageMessage,
    AudioMessageBase,
    AudioMessage,
    MongoAudioMessage,
    Message,
    MongoMessage,
    MessageType,
    ZodAnonymousConversationIDSchema,
} from "./Zod";
import { nanoid } from "nanoid";

export function createTextMessage(
    origin: MessageOrigin,
    constructMessage: () => TextMessageBase,
    id?: string
): TextMessage {
    return {
        ...constructMessage(),
        id: id ?? nanoid(),
        origin,
        type: "text",
        date: new Date(),
    };
}

export function createMongoTextMessage(
    origin: MessageOrigin,
    constructMessage: () => TextMessageBase,
    id?: string
): MongoTextMessage {
    return {
        ...constructMessage(),
        id: id ?? nanoid(),
        origin,
        type: "text",
        date: new Date().toISOString(),
    };
}

export function createImageMessage(
    origin: MessageOrigin,
    constructMessage: () => ImageMessageBase,
    id?: string
): ImageMessage {
    return {
        ...constructMessage(),
        id: id ?? nanoid(),
        origin,
        type: "image",
        date: new Date(),
    };
}

export function createMongoImageMessage(
    origin: MessageOrigin,
    constructMessage: () => ImageMessageBase,
    id?: string
): MongoImageMessage {
    return {
        ...constructMessage(),
        id: id ?? nanoid(),
        origin,
        type: "image",
        date: new Date().toISOString(),
    };
}

export function createAudioMessage(
    origin: MessageOrigin,
    constructMessage: () => AudioMessageBase,
    id?: string
): AudioMessage {
    return {
        ...constructMessage(),
        id: id ?? nanoid(),
        origin,
        type: "audio",
        date: new Date(),
    };
}

export function createMongoAudioMessage(
    origin: MessageOrigin,
    constructMessage: () => AudioMessageBase,
    id?: string
): MongoAudioMessage {
    return {
        ...constructMessage(),
        id: id ?? nanoid(),
        origin,
        type: "audio",
        date: new Date().toISOString(),
    };
}

export function createMessage(
    type: MessageType,
    origin: MessageOrigin,
    constructMessage: () => TextMessageBase | ImageMessageBase | AudioMessageBase,
    mongo: boolean,
    id?: string
): Message | MongoMessage {
    if (type === "text") {
        const createFunction = mongo ? createMongoTextMessage : createTextMessage;
        return createFunction(origin, constructMessage as () => TextMessageBase, id);
    } else if (type === "image") {
        const createFunction = mongo ? createMongoImageMessage : createImageMessage;
        return createFunction(origin, constructMessage as () => ImageMessageBase, id);
    } else {
        const createFunction = mongo ? createMongoAudioMessage : createAudioMessage;
        return createFunction(origin, constructMessage as () => AudioMessageBase, id);
    }
}

export function isMongoMessage(
    message: Message | MongoMessage
): message is MongoMessage {
    return typeof message.date === "string";
}

export function toMongoMessage(message: Message): MongoMessage {
    return {
        ...message,
        date: message.date.toISOString()
    };
}

export function toMessage(message: MongoMessage): Message {
    return {
        ...message,
        date: new Date(message.date)
    };
}

export function isAnonymousID(id: string): boolean {
    return ZodAnonymousConversationIDSchema.safeParse(id).success;
}