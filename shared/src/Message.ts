import { nanoid } from "nanoid";
import { z } from "zod";

// The message can only originate from the sender or the recipient.
export const ZodMessageOriginSchema = z.enum(["sender", "recepient"]);
export type MessageOrigin = z.infer<typeof ZodMessageOriginSchema>;
export const SwaggerMessageOriginSchema = {
    "@enum": ["sender", "recepient"]
};

// Define the base separately to reduce repetition.
export type MessageBase<T extends string, Mongo extends boolean = false> = {
    id: string,
    origin: MessageOrigin;
    type: T;
    date: Mongo extends true ? string : Date;
};
export const ZodMessageBaseSchema = <T extends string>(
    type: T
) => z.object({
    id: z.string(),
    origin: ZodMessageOriginSchema,
    type: z.literal(type),
    date: z.date()
});

export const MongoMessageBaseSchema = <T extends string>(
    type: T
) => z.object({
    id: z.string(),
    origin: ZodMessageOriginSchema,
    type: z.literal(type),
    date: z.string({message: "Mongo only supports string dates."})
});

export type TextMessage<Mongo extends boolean = false> = {
    text: string;
} & MessageBase<"text", Mongo>;
export const TextMessageSchema = z.intersection(
    ZodMessageBaseSchema("text"),
    z.object({
        text: z.string()
    })
);
export const MongoTextMessageSchema = z.intersection(
    MongoMessageBaseSchema("text"),
    z.object({
        text: z.string()
    })
);
// Since dates aren't serializable, we don't need a Swagger
// schema for any object that contains a date.
export const SwaggerMongoTextMessageSchema = {
    $id: "abc123",
    $type: "text",
    $origin: "sender",
    $date: "2021-01-01T00:00:00.000Z",
    $text: "Hello, world!"
}

export type ImageMessage<Mongo extends boolean = false> = {
    src: string;
    alt?: string;
} & MessageBase<"image", Mongo>;
export const ImageMessageSchema = z.intersection(
    ZodMessageBaseSchema("image"),
    z.object({
        src: z.string(),
        alt: z.string().optional()
    })
);
export const MongoImageMessageSchema = z.intersection(
    MongoMessageBaseSchema("image"),
    z.object({
        src: z.string(),
        alt: z.string().optional()
    })
);
export const SwaggerMongoImageMessageSchema = {
    $id: "abc123",
    $type: "image",
    $origin: "sender",
    $date: "2021-01-01T00:00:00.000Z",
    $src: "https://example.com/image.jpg",
    alt: "An example image."
};


export type AudioMessage<Mongo extends boolean = false> = {
    src: string;
} & MessageBase<"audio", Mongo>;
export const AudioMessageSchema = z.intersection(
    ZodMessageBaseSchema("audio"),
    z.object({
        src: z.string()
    })
);
export const MongoAudioMessageSchema = z.intersection(
    MongoMessageBaseSchema("audio"),
    z.object({
        src: z.string()
    })
);
export const SwaggerMongoAudioMessageSchema = {
    $id: "abc123",
    $type: "audio",
    $origin: "sender",
    $date: "2021-01-01T00:00:00.000Z",
    $src: "https://example.com/audio.mp3"
};

// Combined type for any speech bubble message.
export type Message = TextMessage | ImageMessage | AudioMessage;
export type MongoMessage = TextMessage<true> | ImageMessage<true> | AudioMessage<true>;

export const MessageSchema = z.union([TextMessageSchema, ImageMessageSchema, AudioMessageSchema]);
export const MongoMessageSchema = z.union([MongoTextMessageSchema, MongoImageMessageSchema, MongoAudioMessageSchema]);
export const SwaggerMongoMessageSchema = {
    oneOf: [
        {
            type: "object",
            properties: {
                type: {
                    type: "string",
                    enum: ["text"],
                    required: true
                },

                text: {
                    type: "string",
                    required: true,
                    example: SwaggerMongoTextMessageSchema.$text
                },

                origin: {
                    type: "string",
                    enum: SwaggerMessageOriginSchema["@enum"],
                    required: true,
                    example: SwaggerMongoTextMessageSchema.$origin
                },

                date: {
                    type: "string",
                    required: true,
                    example: SwaggerMongoTextMessageSchema.$date
                },

                id: {
                    type: "string",
                    required: true,
                    example: SwaggerMongoTextMessageSchema.$id
                }
            }
        },
        {
            type: "object",
            properties: {
                type: {
                    type: "string",
                    enum: ["image"],
                    required: true
                },

                src: {
                    type: "string",
                    required: true,
                    example: SwaggerMongoImageMessageSchema.$src
                },

                alt: {
                    type: "string",
                    required: false,
                    example: SwaggerMongoImageMessageSchema.alt
                },

                origin: {
                    type: "string",
                    enum: SwaggerMessageOriginSchema["@enum"],
                    required: true,
                    example: SwaggerMongoImageMessageSchema.$origin
                },

                date: {
                    type: "string",
                    required: true,
                    example: SwaggerMongoImageMessageSchema.$date
                },

                id: {
                    type: "string",
                    required: true,
                    example: SwaggerMongoImageMessageSchema.$id
                }
            }
        },
        {
            type: "object",
            properties: {
                type: {
                    type: "string",
                    enum: ["audio"],
                    required: true
                },

                src: {
                    type: "string",
                    required: true,
                    example: SwaggerMongoAudioMessageSchema.$src
                },

                origin: {
                    type: "string",
                    enum: SwaggerMessageOriginSchema["@enum"],
                    required: true,
                    example: SwaggerMongoAudioMessageSchema.$origin
                },

                date: {
                    type: "string",
                    required: true,
                    example: SwaggerMongoAudioMessageSchema.$date
                },

                id: {
                    type: "string",
                    required: true,
                    example: SwaggerMongoAudioMessageSchema.$id
                }
            }
        }
    ]
};

// Combined type for all different types options for speech bubble messages.
export type MessageType = Message["type"];
export const MessageTypeSchema = z.union([z.literal("text"), z.literal("image"), z.literal("audio")]);
export const SwaggerMessageTypeSchema = {
    "@enum": ["text", "image", "audio"]
};

// Get the message object of the specified type where the type is just a string.
export type MessageOfType<
    T extends MessageType,
    Mongo extends boolean = false
> = Extract<
    Mongo extends true ? MongoMessage : Message,
    { type: T }
>;
export const MessageOfTypeSchema = <T extends MessageType>(
    type: T
) => {
    if (type === "text") {
        return TextMessageSchema;
    } else if (type === "image") {
        return ImageMessageSchema;
    } else if (type === "audio") {
        return AudioMessageSchema;
    }
}
export const MongoMessageOfTypeSchema = <T extends MessageType>(
    type: T
) => {
    if (type === "text") {
        return MongoTextMessageSchema;
    } else if (type === "image") {
        return MongoImageMessageSchema;
    } else if (type === "audio") {
        return MongoAudioMessageSchema;
    }
}
export const SwaggerMongoMessageOfTypeSchema = <T extends MessageType>(
    type: T
) => {
    if (type === "text") {
        return SwaggerMongoTextMessageSchema;
    } else if (type === "image") {
        return SwaggerMongoImageMessageSchema;
    } else if (type === "audio") {
        return SwaggerMongoAudioMessageSchema;
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
};
export const SwaggerMongoMessageExclusivePropsSchema = <T extends MessageType>(
    type: T
) => {
    if (type === "text") {
        return {
            $text: SwaggerMongoTextMessageSchema.$text
        };
    } else if (type === "image") {
        return {
            $src: SwaggerMongoImageMessageSchema.$src,
            alt: SwaggerMongoImageMessageSchema.alt
        };
    } else if (type === "audio") {
        return {
            $src: SwaggerMongoAudioMessageSchema.$src
        };
    }
}

export type Conversation = {
    id: string;
    messages: Message[];
};

export type MongoConversation = {
    _id: string;
    messages: MongoMessage[];
};

export const SwaggerMongoConversationSchema = {
    type: "object",
    properties: {
        _id: {
            type: "string",
            required: true,
            example: "abc123"
        },
        messages: {
            type: "array",
            items: SwaggerMongoMessageSchema
        }
    }
};

function refineUniqueMessages(messages: Message[] | MongoMessage[]) {
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
    id: z.string(),
    messages: UniqueMessageArraySchema
});

export const MongoConversationSchema = z.object({
    _id: z.string(),
    messages: UniqueMongoMessageArraySchema
});

export function createMessage<T extends MessageType, Mongo extends boolean = false>(
    type: T,
    origin: MessageOrigin,
    constructMessage: () => MessageExclusiveProps<T, Mongo>,
    mongo?: Mongo,
    id?: string
): MessageOfType<T, Mongo> {
    return ({
        ...constructMessage(),
        id: id ?? nanoid(),
        origin,
        type,
        date: mongo ? new Date().toISOString() : new Date()
    } as MessageOfType<T, Mongo>);
}

export function isMongoMessage(message: Message | MongoMessage): message is MongoMessage {
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