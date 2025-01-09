import { swaggerRegistry } from "src/Swagger";
import { zodSuccessResponseSchema } from "./SuccessResponse";
import { z } from "zod";
import { ZodMongoConversationSchema } from "src/Message";
import { ZodErrorResponseSchema } from "./ErrorResponse";
import { ZodConversationIDSchema } from "src/Message/Zod/ConversationID";

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

export const ZodConversationGetURLParamsSchema = swaggerRegistry.register(
    "ConversationGetURLParams",
    z.object({
        id: z.union([
            z.literal("demo"),
            ZodConversationIDSchema
        ])
        .openapi({
            description: "ID of the conversation to get",
            example: "demo"
        })
    })
)

export type ConversationGet200ResponseBody = z.infer<typeof ZodConversationGet200ResponseBodySchema>;
export type ConversationGetResponseBody = z.infer<typeof ZodConversationGetResponseBodySchema>;
export type ConversationGetURLParams = z.infer<typeof ZodConversationGetURLParamsSchema>;