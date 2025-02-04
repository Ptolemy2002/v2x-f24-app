import { swaggerRegistry } from "src/Swagger";
import { zodSuccessResponseSchema } from "./SuccessResponse";
import { ZodErrorResponseSchema } from "./ErrorResponse";
import { z } from "zod";
import { ZodConversationUpdateByIDRequestBodySchema, ZodConversationUpdateByID200ResponseBodySchema } from "./ConversationUpdateByID";

export const ZodConversationUpdateByNameURLParamsSchema = swaggerRegistry.register(
    "ConversationUpdateByNameURLParams",
    z.object({
        name: z.string()
    }).openapi({
        description: "The URL parameters for updating a conversation by name."
    })
);

export const ZodConversationUpdateByNameRequestBodySchema = swaggerRegistry.register(
    "ConversationUpdateByNameRequestBody",
    ZodConversationUpdateByIDRequestBodySchema
);

export const ZodConversationUpdateByName200ResponseBodySchema = swaggerRegistry.register(
    "ConversationUpdateByNameResponseBody",
    ZodConversationUpdateByID200ResponseBodySchema
);

export const ZodConversationUpdateByNameResponseBodySchema = swaggerRegistry.register(
    "ConversationUpdateByNameResponseBody",
    z.union([
        ZodConversationUpdateByName200ResponseBodySchema,
        ZodErrorResponseSchema
    ]).openapi({
        description: "The response for updating a conversation by name."
    })
);

export type ConversationUpdateByNameURLParams = z.infer<typeof ZodConversationUpdateByNameURLParamsSchema>;

export type ConversationUpdateByNameRequestBodyInput = z.input<typeof ZodConversationUpdateByNameRequestBodySchema>;
export type ConversationUpdateByNameRequestBodyOutput = z.output<typeof ZodConversationUpdateByNameRequestBodySchema>;

export type ConversationUpdateByName200ResponseBody = z.output<typeof ZodConversationUpdateByName200ResponseBodySchema>;
export type ConversationUpdateByNameResponseBody = z.output<typeof ZodConversationUpdateByNameResponseBodySchema>;