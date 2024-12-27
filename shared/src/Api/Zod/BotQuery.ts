import { ZodMongoConversationSchema, ZodMongoMessageSchema } from "src/Message";
import { swaggerRegistry } from "src/Swagger";
import { z } from "zod";
import { zodSuccessResponseSchema } from "./SuccessResponse";
import { ZodErrorResponseSchema } from "./ErrorResponse";

export const ZodBotQueryRequestBodySchema = swaggerRegistry.register(
    "BotQueryRequestBody",
    z.object({
        conversation: ZodMongoConversationSchema
    }).openapi({
        description: "The request body for the bot query endpoint"
    })
);

export const ZodBotQuery200ResponseBodySchema = swaggerRegistry.register(
    "BotQuery200ResponseBody",
    zodSuccessResponseSchema(z.object({
        newMessage: ZodMongoMessageSchema
    }).openapi({
        description: "The 200 response body for the bot query endpoint"
    }))
);

export const ZodBotQueryResponseBody = swaggerRegistry.register(
    "BotQueryResponseBody",
    z.union([
        ZodBotQuery200ResponseBodySchema,
        ZodErrorResponseSchema
    ]).openapi({
        description: "The response body for the bot query endpoint"
    })
);

export type BotQueryRequestBody = z.infer<typeof ZodBotQueryRequestBodySchema>;
export type BotQuery200ResponseBody = z.infer<typeof ZodBotQuery200ResponseBodySchema>;
export type BotQueryResponseBody = z.infer<typeof ZodBotQueryResponseBody>;