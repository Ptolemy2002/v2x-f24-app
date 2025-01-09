import { Types } from "mongoose";
import { swaggerRegistry } from "src/Swagger";
import { z } from "zod";

export const ZodConversationIDSchema = swaggerRegistry.register(
    "ConversationID",
    z.string()
        .refine((id) => Types.ObjectId.isValid(id), { message: "Invalid ID" })
        .openapi({
            description: "The ID of a conversation.",
            example: "abc123"
        })
);

export type SpaceID = z.infer<typeof ZodConversationIDSchema>;