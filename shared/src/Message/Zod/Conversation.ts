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
        messages: ZodUniqueMessageArraySchema
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
        messages: ZodUniqueMongoMessageArraySchema
    })
    .openapi({
        description: "The MongoDB representation of a conversation."
    })
);

export type Conversation = z.infer<typeof ZodConversationSchema>;
export type MongoConversation = z.infer<typeof ZodMongoConversationSchema>;