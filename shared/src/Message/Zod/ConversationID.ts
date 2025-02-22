import { Types } from "mongoose";
import { swaggerRegistry } from "src/Swagger";
import { z } from "zod";

export const ZodConversationIDSchema = swaggerRegistry.register(
    "ConversationID",
    z.string()
        .refine((id) => Types.ObjectId.isValid(id), { message: "Invalid ID" })
        .openapi({
            description: "The ID of a conversation in the database",
            example: "abc123"
        })
);

export const ZodAnonymousConversationIDSchema = swaggerRegistry.register(
    "AnonymousConversationID",
    z.string().regex(/^anonymous-[\w-]+/).openapi({
        description: "The ID of an anonymous conversation",
        example: "anonymous-abc123"
    })
);

export const ZodConversationIDWithAnonymousSchema = swaggerRegistry.register(
    "ConversationIDWithAnonymous",
    z.union([
        ZodConversationIDSchema,
        ZodAnonymousConversationIDSchema
    ]).openapi({
        description: "The ID of the conversation or 'anonymous-<id>' if the conversation should not be saved to the database."
    })
);

export type SpaceID = z.infer<typeof ZodConversationIDSchema>;