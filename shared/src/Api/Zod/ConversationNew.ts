import { ZodMongoConversationSchema } from "src/Message";
import { swaggerRegistry } from "src/Swagger";
import { z } from "zod";
import { zodSuccessResponseSchema } from "./SuccessResponse";
import { ZodErrorResponseSchema } from "./ErrorResponse";

export const ZodConversationNew200ResponseBodySchema = swaggerRegistry.register(
    "ConversationNew200ResponseBody",
    zodSuccessResponseSchema(z.object({
        conversation: ZodMongoConversationSchema
    }).openapi({
        description: "The 200 response body for the new conversation endpoint"
    }))
);

export const ZodConversationNewResponseBodySchema = swaggerRegistry.register(
    "ConversationNewResponseBody",
    z.union([
        ZodConversationNew200ResponseBodySchema,
        ZodErrorResponseSchema
    ]).openapi({
        description: "The response body for the new conversation endpoint"
    })
);

export type ConversationNew200ResponseBody = z.infer<typeof ZodConversationNew200ResponseBodySchema>;
export type ConversationNewResponseBody = z.infer<typeof ZodConversationNewResponseBodySchema>;