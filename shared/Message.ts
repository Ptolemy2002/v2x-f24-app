import { nanoid } from "nanoid";
import { z } from "zod";

// The message can only originate from the sender or the recipient.
export type MessageOrigin = "sender" | "recepient";
export const MessageOriginSchema = z.enum(["sender", "recepient"]);

// Define the base separately to reduce repetition.
export type MessageBase<T extends string, Mongo extends boolean = false> = {
    id: string,
    origin: MessageOrigin;
    type: T;
    date: Mongo extends true ? string : Date;
};
export const MessageBaseSchema = <T extends string, Mongo extends boolean = false>(
    type: T,
    mongo: Mongo
) => z.object({
    id: z.string(),
    origin: MessageOriginSchema,
    type: z.literal(type),
    date: mongo ? z.string({message: "Mongo requires dates be represented as strings."}) : z.date()
});

export type TextMessage<Mongo extends boolean = false> = {
    text: string;
} & MessageBase<"text", Mongo>;
export const TextMessageSchema = <Mongo extends boolean = false>(mongo: Mongo) => z.intersection(
    MessageBaseSchema("text", mongo),
    z.object({
        text: z.string()
    })
);

export type ImageMessage<Mongo extends boolean = false> = {
    src: string;
    alt?: string;
} & MessageBase<"image", Mongo>;
export const ImageMessageSchema = <Mongo extends boolean = false>(mongo: Mongo) => z.intersection(
    MessageBaseSchema("image", mongo),
    z.object({
        src: z.string(),
        alt: z.string().optional()
    })
);

export type AudioMessage<Mongo extends boolean = false> = {
    src: string;
} & MessageBase<"audio", Mongo>;
export const AudioMessageSchema = <Mongo extends boolean = false>(mongo: Mongo) => z.intersection(
    MessageBaseSchema("audio", mongo),
    z.object({
        src: z.string()
    })
);

// Combined type for any speech bubble message.
export type Message = TextMessage | ImageMessage | AudioMessage;
export type MongoMessage = TextMessage<true> | ImageMessage<true> | AudioMessage<true>;

export const MessageSchema = z.union([TextMessageSchema(false), ImageMessageSchema(false), AudioMessageSchema(false)]);
export const MongoMessageSchema = z.union([TextMessageSchema(true), ImageMessageSchema(true), AudioMessageSchema(true)]);

// Combined type for all different types options for speech bubble messages.
export type MessageType = Message["type"];
export const MessageTypeSchema = z.union([z.literal("text"), z.literal("image"), z.literal("audio")]);

// Get the message object of the specified type where the type is just a string.
export type MessageOfType<
    T extends MessageType,
    Mongo extends boolean = false
> = Extract<
    Mongo extends true ? MongoMessage : Message,
    { type: T }
>;
export const MessageOfTypeSchema = <T extends MessageType>(
    type: T,
    mongo: boolean = false
) => {
    if (type === "text") {
        return TextMessageSchema(mongo);
    } else if (type === "image") {
        return ImageMessageSchema(mongo);
    } else if (type === "audio") {
        return AudioMessageSchema(mongo);
    }
}

// Get the properties that are exclusive to the speech bubble of specified type
// (i.e. included in the specified speech bubble type but not in the base type).
export type MessageExclusiveProps<T extends MessageType, Mongo extends boolean = false> =
    Omit<MessageOfType<T, Mongo>, keyof MessageBase<T, Mongo>>;
export const MessageExclusivePropsSchema = <T extends MessageType>(
    type: T
) => {
    if (type === "text") {
        return z.object({
            text: z.string()
        });
    } else if (type === "image") {
        return z.object({
            src: z.string(),
            alt: z.string().optional()
        });
    } else if (type === "audio") {
        return z.object({
            src: z.string(),
            alt: z.string().optional()
        });
    }
}

export type Conversation = {
    messages: Message[];
};

export type MongoConversation = {
    messages: MongoMessage[];
};

function refineUniqueMessages(messages: Message[]) {
    const seenIds = new Set<string>();
    for (const message of messages) {
        if (seenIds.has(message.id)) {
            return false;
        }
        seenIds.add(message.id);
    }
    return true;
}

export const UniqueMessageArraySchema = z.array(MessageSchema).refine(
    refineUniqueMessages,
    { message: "Duplicate message IDs found." }
);

export const UniqueMongoMessageArraySchema = z.array(MongoMessageSchema).refine(
    refineUniqueMessages,
    { message: "Duplicate message IDs found." }
);

export const ConversationSchema = z.object({
    messages: UniqueMessageArraySchema
});

export const MongoConversationSchema = z.object({
    messages: UniqueMongoMessageArraySchema
});

export function createMessage<T extends MessageType, Mongo extends boolean = false>(
    type: T,
    origin: MessageOrigin,
    constructMessage: () => MessageExclusiveProps<T>,
    mongo?: Mongo,
    id?: string
) {
    return ({
        ...constructMessage(),
        id: id ?? nanoid(),
        origin,
        type,
        date: mongo ? new Date().toISOString() : new Date()
    } as MessageOfType<T, Mongo>);
}