import { ZodMongoConversationSchema } from "src/Message";
import { swaggerRegistry } from "src/Swagger";
import { z } from "zod";
import { zodSuccessResponseSchema } from "./SuccessResponse";
import { ZodErrorResponseSchema } from "./ErrorResponse";
import { ZodAnonymousQueryParamSchema, ZodAnonymousShorthandQueryParamSchema } from "./QueryParams";

export const ZodConversationNew200ResponseBodySchema = swaggerRegistry.register(
    "ConversationNew200ResponseBody",
    zodSuccessResponseSchema(z.object({
        conversation: ZodMongoConversationSchema
    }).openapi({
        description: "The 200 response body for the new conversation endpoint"
    }))
);

export const ZodConversationNewQueryParamsSchema = swaggerRegistry.register(
    "ConversationNewQueryParams",
    z.object({
        anonymous: ZodAnonymousQueryParamSchema.default("f"),
        a: ZodAnonymousShorthandQueryParamSchema.optional()
    })
    .refine((data) => {
        if (data.a !== undefined) data.anonymous = data.a;
        return data;
    })
    .openapi({
        description: "The query parameters for the new conversation endpoint"
    })
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

export type ConversationNewQueryParamsInput = z.input<typeof ZodConversationNewQueryParamsSchema>;
export type ConversationNewQueryParamsOutput = z.output<typeof ZodConversationNewQueryParamsSchema>;