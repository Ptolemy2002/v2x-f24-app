import { swaggerRegistry } from "src/Swagger";
import { z } from "zod";
import { ZodUniqueMessageArraySchema, ZodUniqueMongoMessageArraySchema } from "./UniqueMessageArray";
import { ZodConversationIDSchema } from "./ConversationID";

export const ZodConversationSchema = swaggerRegistry.register(
    "Conversation",
    z.object({
        id: z.union([
            ZodConversationIDSchema,
            z.literal("anonymous")
        ]).openapi({
            description: "The ID of the conversation or 'anonymous' if the conversation should not be saved to the database.",
            example: "abc123"
        }),
        name: z.string().openapi({
            description: "The name of the conversation.",
            example: "Untitled Conversation"
        }),
        messages: ZodUniqueMessageArraySchema,
        createdAt: z.date().openapi({
            description: "The date and time the conversation was created.",
            example: "2021-07-01T00:00:00.000Z"
        })
    })
    .openapi({
        description: "A conversation."
    })
);

export const ZodMongoConversationSchema = swaggerRegistry.register(
    "MongoConversation",
    z.object({
        _id: z.union([
            ZodConversationIDSchema,
            z.literal("anonymous")
        ]).openapi({
            description: "The ID of the conversation or 'anonymous' if the conversation should not be saved to the database.",
            example: "abc123"
        }),
        name: z.string().openapi({
            description: "The name of the conversation.",
            example: "Untitled Conversation"
        }),
        messages: ZodUniqueMongoMessageArraySchema,
        createdAt: z.string().openapi({
            description: "The date and time the conversation was created.",
            example: "2021-07-01T00:00:00.000Z"
        })
    })
    .openapi({
        description: "The MongoDB representation of a conversation."
    })
);

export type Conversation = z.infer<typeof ZodConversationSchema>;
export type MongoConversation = z.infer<typeof ZodMongoConversationSchema>;