import { MessageOriginEnum, MessageTypeEnum } from "./Other";

export const SwaggerMessageOriginSchema = {
    "@enum": MessageOriginEnum
} as const;

export const SwaggerMessageTypeSchema = {
    "@enum": MessageTypeEnum
} as const;

const MessageExamples = {
    id: "abc123",
    origin: "sender",
    date: "2021-01-01T00:00:00.000Z",
    text: "Hello, world!",
    imageSrc: "https://example.com/image.jpg",
    audioSrc: "https://example.com/audio.mp3",
    imageAlt: "An example image."
} as const;

// Since dates aren't serializable, we don't need a Swagger
// schema for any object that contains a date.
export const SwaggerMongoTextMessageSchema = {
    $id: MessageExamples.id,
    $type: "text",
    $origin: MessageExamples.origin,
    $date: MessageExamples.date,
    $text: MessageExamples.text
} as const

export const SwaggerMongoImageMessageSchema = {
    $id: MessageExamples.id,
    $type: "image",
    $origin: MessageExamples.origin,
    $date: MessageExamples.date,
    $src: MessageExamples.imageSrc,
    alt: MessageExamples.imageAlt
} as const;

export const SwaggerMongoAudioMessageSchema = {
    $id: MessageExamples.id,
    $type: "audio",
    $origin: MessageExamples.origin,
    $date: MessageExamples.date,
    $src: MessageExamples.audioSrc
} as const;

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
                    example: MessageExamples.text
                },

                origin: {
                    type: "string",
                    enum: MessageOriginEnum,
                    required: true,
                    example: MessageExamples.origin
                },

                date: {
                    type: "string",
                    required: true,
                    example: MessageExamples.date
                },

                id: {
                    type: "string",
                    required: true,
                    example: MessageExamples.id
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
                    example: MessageExamples.imageSrc
                },

                alt: {
                    type: "string",
                    required: false,
                    example: MessageExamples.imageAlt
                },

                origin: {
                    type: "string",
                    enum: SwaggerMessageOriginSchema["@enum"],
                    required: true,
                    example: MessageExamples.origin
                },

                date: {
                    type: "string",
                    required: true,
                    example: MessageExamples.date
                },

                id: {
                    type: "string",
                    required: true,
                    example: MessageExamples.id
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
                    example: MessageExamples.audioSrc
                },

                origin: {
                    type: "string",
                    enum: SwaggerMessageOriginSchema["@enum"],
                    required: true,
                    example: MessageExamples.origin
                },

                date: {
                    type: "string",
                    required: true,
                    example: MessageExamples.date
                },

                id: {
                    type: "string",
                    required: true,
                    example: MessageExamples.id
                }
            }
        }
    ]
} as const;

export const SwaggerMongoConversationSchema = {
    type: "object",
    properties: {
        _id: {
            type: "string",
            required: true,
            example: MessageExamples.id
        },
        messages: {
            type: "array",
            items: SwaggerMongoMessageSchema
        }
    }
};