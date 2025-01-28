import { swaggerRegistry } from "src/Swagger";
import { z } from "zod";
import { zodSuccessResponseSchema } from "./SuccessResponse";
import { ZodErrorResponseSchema } from "./ErrorResponse";
import { ZodConversationIDSchema } from "src/Message";

export const ZodConversationListName200ResponseBodySchema = swaggerRegistry.register(
    "ConversationListName200ResponseBody",
    zodSuccessResponseSchema(z.object({
        entries: z.array(z.object({
            _id: ZodConversationIDSchema,
            name: z.string()
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