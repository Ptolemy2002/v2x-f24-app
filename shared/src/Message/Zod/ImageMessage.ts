import { swaggerRegistry } from "src/Swagger";
import { z } from "zod";
import { ZodMessageBaseSchema, ZodMongoMessageBaseSchema } from "./MessageBase";

export const ZodImageMessageBaseSchema = swaggerRegistry.register(
    "ImageMessageBase",
    z.object({
        src: z.string().openapi({
            description: "The source of the image.",
            example: "https://example.com/image.jpg"
        }),
        alt: z.string().openapi({
            description: "The alt text for the image.",
            example: "An image of a cat."
        })
    }).openapi({
        description: "The base schema for an image message."
    })
);

export const ZodImageMessageSchema = swaggerRegistry.register(
    "ImageMessage",
    ZodMessageBaseSchema.merge(ZodImageMessageBaseSchema).merge(z.object({
        type: z.literal("image").openapi({
            description: "The type of message."
        })
    })).openapi({
        description: "An image message."
    })
);

export const ZodMongoImageMessageSchema = swaggerRegistry.register(
    "MongoImageMessage",
    ZodMongoMessageBaseSchema.merge(ZodImageMessageBaseSchema).merge(z.object({
        type: z.literal("image").openapi({
            description: "The type of message."
        })
    })).openapi({
        description: "The MongoDB representation of an image message."
    })
);

export type ImageMessageBase = z.infer<typeof ZodImageMessageBaseSchema>;
export type ImageMessage = z.infer<typeof ZodImageMessageSchema>;
export type MongoImageMessage = z.infer<typeof ZodMongoImageMessageSchema>;