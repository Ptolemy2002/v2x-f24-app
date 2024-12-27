import { swaggerRegistry } from "src/Swagger";
import { zodSuccessResponseSchema } from "./SuccessResponse";
import { z } from "zod";
import { ZodMongoConversationSchema } from "src/Message";
import { ZodErrorResponseSchema } from "./ErrorResponse";

export const ZodConversationGet200ResponseBodySchema = swaggerRegistry.register(
    "ConversationGet200ResponseBody",
    zodSuccessResponseSchema(z.object({
        conversation: ZodMongoConversationSchema
    }).openapi({
        description: "The 200 response body for the conversation get endpoint"
    }))
);

export const ZodConversationGetResponseBodySchema = swaggerRegistry.register(
    "ConversationGetResponseBody",
    z.union([
        ZodConversationGet200ResponseBodySchema,
        ZodErrorResponseSchema
    ]).openapi({
        description: "The response body for the conversation get endpoint"
    })
);

export const ZodConversationGetParamsSchema = z.object({
    id: z.string().openapi({
        description: "ID of the conversation to get",
        example: "demo"
    })
});

export type ConversationGet200ResponseBody = z.infer<typeof ZodConversationGet200ResponseBodySchema>;
export type ConversationGetResponseBody = z.infer<typeof ZodConversationGetResponseBodySchema>;
export type ConversationGetParams = z.infer<typeof ZodConversationGetParamsSchema>;