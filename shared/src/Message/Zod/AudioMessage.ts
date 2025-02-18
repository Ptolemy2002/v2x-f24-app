import { swaggerRegistry } from "src/Swagger";
import { z } from "zod";
import { ZodMessageBaseSchema, ZodMongoMessageBaseSchema } from "./MessageBase";

export const ZodAudioMessageBaseSchema = swaggerRegistry.register(
    "AudioMessageBase",
    z.object({
        src: z.string().openapi({
            description: "The source of the audio, being a key that is part of the 'files' property in the conversation it belongs to.",
            example: "example-audio"
        }),
        alt: z.string().optional().openapi({
            description: "The alt text for the audio, if applicable."
        })
    }).openapi({
        description: "The base schema for an audio message."
    })
);

export const ZodAudioMessageSchema = swaggerRegistry.register(
    "AudioMessage",
    ZodMessageBaseSchema.merge(ZodAudioMessageBaseSchema).merge(z.object({
        type: z.literal("audio").openapi({
            description: "The type of message."
        })
    })).openapi({
            description: "An audio message."
        })
);

export const ZodMongoAudioMessageSchema = swaggerRegistry.register(
    "MongoAudioMessage",
    ZodMongoMessageBaseSchema.merge(ZodAudioMessageBaseSchema).merge(z.object({
        type: z.literal("audio").openapi({
            description: "The type of message."
        })
    })).openapi({
        description: "The MongoDB representation of an audio message."
    })
);

export type AudioMessageBase = z.infer<typeof ZodAudioMessageBaseSchema>;
export type AudioMessage = z.infer<typeof ZodAudioMessageSchema>;
export type MongoAudioMessage = z.infer<typeof ZodMongoAudioMessageSchema>;