import { swaggerRegistry } from "src/Swagger";
import { z } from "zod";
import { ZodUniqueMessageArraySchema, ZodUniqueMongoMessageArraySchema } from "./UniqueMessageArray";
import { ZodConversationIDWithAnonymousSchema } from "./ConversationID";
import { ZodConversationFileEntrySchema } from "./ConversationFileEntry";

export const ZodConversationSchema = swaggerRegistry.register(
    "Conversation",
    z.object({
        id: ZodConversationIDWithAnonymousSchema,
        name: z.string().openapi({
            description: "The name of the conversation.",
            example: "Untitled Conversation"
        }),
        messages: ZodUniqueMessageArraySchema,
        files: z.record(z.string(), ZodConversationFileEntrySchema)
        .openapi({
                description: "A map of files available to the conversation to their URLs."
            }),
        createdAt: z.date().openapi({
            description: "The date and time the conversation was created.",
            example: "new Date(2021-07-01T00:00:00.000Z)"
        })
    })
    .openapi({
        description: "A conversation."
    })
);

export const ZodMongoConversationSchema = swaggerRegistry.register(
    "MongoConversation",
    ZodConversationSchema.omit({
        id: true
    }).extend({
        _id: ZodConversationSchema.shape.id,
        messages: ZodUniqueMongoMessageArraySchema,
        createdAt: z.string().datetime({
            offset: true,
            message: "createdAt must be a valid ISO 8601 date string."
        }).openapi({
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