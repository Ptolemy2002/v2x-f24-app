import { swaggerRegistry } from "src/Swagger";
import { z } from "zod";
import { ZodUniqueMessageArraySchema, ZodUniqueMongoMessageArraySchema } from "./UniqueMessageArray";
import { ZodConversationIDSchema } from "./ConversationID";

export const ZodConversationSchema = swaggerRegistry.register(
    "Conversation",
    z.object({
        id: ZodConversationIDSchema.openapi({
            description: "The ID of the conversation.",
            example: "abc123"
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
        _id: ZodConversationIDSchema.openapi({
            description: "The ID of the conversation.",
            example: "abc123"
        }),
        messages: ZodUniqueMongoMessageArraySchema
    })
    .openapi({
        description: "The MongoDB representation of a conversation."
    })
);

export type Conversation = z.infer<typeof ZodConversationSchema>;
export type MongoConversation = z.infer<typeof ZodMongoConversationSchema>;