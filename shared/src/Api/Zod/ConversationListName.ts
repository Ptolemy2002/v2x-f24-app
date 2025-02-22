import { swaggerRegistry } from "src/Swagger";
import { z } from "zod";
import { zodSuccessResponseSchema } from "./SuccessResponse";
import { ZodErrorResponseSchema } from "./ErrorResponse";
import { ZodConversationIDSchema } from "src/Message";

export const ZodConversationListName200ResponseBodySchema = swaggerRegistry.register(
    "ConversationListName200ResponseBody",
    zodSuccessResponseSchema(z.object({
        entries: z.array(z.object({
            _id: ZodConversationIDSchema
                .openapi({
                    description: "ID of the conversation",
                    example: "abc123"
                }),
            name: z.string()
                .openapi({
                    description: "Name of the conversation",
                    example: "Unititled Conversation"
                }),
            createdAt: z.string()
                .openapi({
                    description: "Date and time the conversation was created",
                    example: "2021-07-01T00:00:00.000Z"
                }),
            modifiedAt: z.string()
                .openapi({
                    description: "Date and time the conversation last had any activity",
                    example: "2021-07-01T00:00:00.000Z"
                })
        }))
    }).openapi({
        description: "The 200 response body for the conversation list name endpoint"
    }))
);

export const ZodConversationListNameResponseBodySchema = swaggerRegistry.register(
    "ConversationListNameResponseBody",
    z.union([
        ZodConversationListName200ResponseBodySchema,
        ZodErrorResponseSchema
    ]).openapi({
        description: "The response body for the conversation list name endpoint"
    })
);

export type ConversationListName200ResponseBody = z.infer<typeof ZodConversationListName200ResponseBodySchema>;
export type ConversationListNameResponseBody = z.infer<typeof ZodConversationListNameResponseBodySchema>;