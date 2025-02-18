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
        files: z.record(z.string(), z.object({
            url: z.string().openapi({
                description: "The URL of the file."
            }),
            alt: z.string().openapi({
                description: "The alt text for the file, if applicable."
            }).optional()
        }))
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