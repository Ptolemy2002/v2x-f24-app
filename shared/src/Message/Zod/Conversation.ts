import { swaggerRegistry } from "src/Swagger";
import { z } from "zod";
import { Types } from "mongoose";
import { ZodUniqueMessageArraySchema, ZodUniqueMongoMessageArraySchema } from "./UniqueMessageArray";

export const ZodConversationSchema = swaggerRegistry.register(
    "Conversation",
    z.object({
        id: z.string().openapi({
            description: "The ID of the conversation.",
            example: "abc123"
        }),
        messages: ZodUniqueMessageArraySchema
    })
    .refine(data => data.id === "demo" || Types.ObjectId.isValid(data.id), {
        message: "Invalid id"
    })
    .openapi({
        description: "A conversation."
    })
);

export const ZodMongoConversationSchema = swaggerRegistry.register(
    "MongoConversation",
    z.object({
        _id: z.string().openapi({
            description: "The ID of the conversation.",
            example: "abc123"
        }),
        messages: ZodUniqueMongoMessageArraySchema
    })
    .refine(data => data._id === "demo" || Types.ObjectId.isValid(data._id), {
        message: "Invalid id"
    })
    .openapi({
        description: "The MongoDB representation of a conversation."
    })
);

export type Conversation = z.infer<typeof ZodConversationSchema>;
export type MongoConversation = z.infer<typeof ZodMongoConversationSchema>;