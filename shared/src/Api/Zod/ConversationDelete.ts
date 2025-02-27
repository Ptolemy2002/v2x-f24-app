import { swaggerRegistry } from "src/Swagger";
import { zodSuccessResponseSchema } from "./SuccessResponse";
import { z } from "zod";
import { ZodErrorResponseSchema } from "./ErrorResponse";
import { ZodConversationIDSchema } from "src/Message/Zod/ConversationID";

export const ZodConversationDelete200ResponseBodySchema = swaggerRegistry.register(
    "ConversationDelete200ResponseBody",
    zodSuccessResponseSchema(z.object({
        deleted: z.boolean()
            .openapi({
                description: "Whether the conversation was successfully deleted",
                example: true
            })
    }).openapi({
        description: "The 200 response body for the conversation delete endpoint"
    }))
);

export const ZodConversationDeleteResponseBodySchema = swaggerRegistry.register(
    "ConversationDeleteResponseBody",
    z.union([
        ZodConversationDelete200ResponseBodySchema,
        ZodErrorResponseSchema
    ]).openapi({
        description: "The response body for the conversation delete endpoint"
    })
);

export const ZodConversationDeleteURLParamsSchema = swaggerRegistry.register(
    "ConversationDeleteURLParams",
    z.object({
        id: ZodConversationIDSchema
            .openapi({
                description: "ID of the conversation to delete.",
                example: "abc123"
            })
    }).openapi({
        description: "The URL parameters for deleting a conversation"
    })
);

export type ConversationDelete200ResponseBody = z.infer<typeof ZodConversationDelete200ResponseBodySchema>;
export type ConversationDeleteResponseBody = z.infer<typeof ZodConversationDeleteResponseBodySchema>;
export type ConversationDeleteURLParams = z.infer<typeof ZodConversationDeleteURLParamsSchema>;