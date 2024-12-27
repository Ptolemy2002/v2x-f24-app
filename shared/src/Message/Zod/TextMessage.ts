import { swaggerRegistry } from "src/Swagger";
import { z } from "zod";
import { ZodMessageBaseSchema, ZodMongoMessageBaseSchema } from "./MessageBase";

export const ZodTextMessageBaseSchema = swaggerRegistry.register(
    "TextMessageBase",
    z.object({
        text: z.string().openapi({
            description: "The text content of the message.",
            example: "Hello, world!"
        })
    }).openapi({
        description: "The base schema for a text message."
    })
);

export const ZodTextMessageSchema = swaggerRegistry.register(
    "TextMessage",
    ZodMessageBaseSchema.merge(ZodTextMessageBaseSchema).merge(z.object({
        type: z.literal("text").openapi({
            description: "The type of message."
        })
    })).openapi({
        description: "A text message."
    })
);

export const ZodMongoTextMessageSchema = swaggerRegistry.register(
    "MongoTextMessage",
    ZodMongoMessageBaseSchema.merge(ZodTextMessageBaseSchema).merge(z.object({
        type: z.literal("text").openapi({
            description: "The type of message."
        })
    })).openapi({
        description: "The MongoDB representation of a text message."
    })
);

export type TextMessageBase = z.infer<typeof ZodTextMessageBaseSchema>;
export type TextMessage = z.infer<typeof ZodTextMessageSchema>;
export type MongoTextMessage = z.infer<typeof ZodMongoTextMessageSchema>;