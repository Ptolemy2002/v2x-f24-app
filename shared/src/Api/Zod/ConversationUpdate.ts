import { parseConversationPath, ZodConversationIDSchema, ZodMongoConversationSchema } from "src/Message";
import { swaggerRegistry } from "src/Swagger";
import { z } from "zod";
import { zodSuccessResponseSchema } from "./SuccessResponse";
import { ZodErrorResponseSchema } from "./ErrorResponse";

export const ZodConversationUpdateURLParamsSchema = swaggerRegistry.register(
    "ConversationUpdateURLParams",
    z.object({
        id: ZodConversationIDSchema
    }).openapi({
        description: "The URL parameters for updating a conversation"
    })
);

export const ZodConversationUpdateRequestBodySchema = swaggerRegistry.register(
    "ConversationUpdateRequestBody",
    z.object({
        difference: z.object({
            $set: z.record(
                z.string().refine((s) => parseConversationPath(s, [
                    "name",
                    (s: string) => s.startsWith("messages."),
                    (s: string) => s.startsWith("files.")
                ]), {
                    message: "Either an invalid path or one that does not allow direct setting"
                }),
                z.unknown()
            )
            .optional()
            .openapi({
                description: "The fields to set. Each key is a path to a field.",
                example: {
                    "name": "New Name"
                }
            }),

            $unset: z.record(
                z.string().refine((s) => parseConversationPath(s, [
                    // Only direct indexes and alt text can be unset
                    "messages.<number>",
                    "messages.<number>.alt",
                    "files.<string>",
                    "files.<string>.alt"
                ]), {
                    message: "Either an invalid path or one that does not allow unsetting"
                }),
                z.literal("")
            )
            .optional()
            .openapi({
                description: "The fields to unset. Each key is a path to a field. Cannot be a direct path to a field, must be nested from a list field.",
                example: {
                    "messages.0": ""
                }
            }),

            $push: z.record(
                z.string().refine((s) => parseConversationPath(s, [
                    "messages"
                ]), {
                    message: "Either an invalid path or one that does not allow pushing"
                }),
                z.object({
                    $each: z.array(z.unknown())
                })
            )
            .optional()
            .openapi({
                description: "The fields to push. Each key is a path to a field. Must be a direct path to a list field.",
                example: {
                    messages: {
                        $each: [
                            {
                                id: "abc123",
                                date: "2021-07-01T00:00:00.000Z",
                                type: "text",
                                origin: "sender",
                                text: "Hello, world!"
                            }
                        ]
                    }
                }
            }),

            $pullAll: z.record(
                z.string().refine((s) => parseConversationPath(s, [
                    "messages"
                ]), {
                    message: "Either an invalid path or one that does not allow pulling"
                }),
                z.object({
                    $in: z.array(z.unknown())
                }).transform((v) => [...v.$in])
            )
            .optional()
            .openapi({
                description: "The fields to pull. Each key is a path to a field. Must be a direct path to a list field.",
                example: {
                    messages: {
                        $in: [
                            {
                                id: "abc123",
                                date: "2021-07-01T00:00:00.000Z",
                                type: "text",
                                origin: "sender",
                                text: "Hello, world!"
                            }
                        ]
                    }
                }
            })
        })
    }).openapi({
        description: "The request body for updating a conversation"
    })
);

export const ZodConversationUpdate200ResponseBodySchema = swaggerRegistry.register(
    "ConversationUpdate200ResponseBody",
    zodSuccessResponseSchema(
        z.object({
            conversation: ZodMongoConversationSchema
                .openapi({
                    description: "The conversation that was updated"
                })
        })
    )
    .openapi({
        description: "The 200 response body from updating a conversation"
    })
);

export const ZodConversationUpdateResponseBodySchema = swaggerRegistry.register(
    "ConversationUpdateResponseBody",
    z.union([
        ZodConversationUpdate200ResponseBodySchema,
        ZodErrorResponseSchema
    ]).openapi({
        description: "The response for updating a conversation"
    })
);

export type ConversationUpdateURLParams = z.infer<typeof ZodConversationUpdateURLParamsSchema>;

export type ConversationUpdateRequestBodyInput = z.input<typeof ZodConversationUpdateRequestBodySchema>;
export type ConversationUpdateRequestBodyOutput = z.output<typeof ZodConversationUpdateRequestBodySchema>;

export type ConversationUpdate200ResponseBody = z.infer<typeof ZodConversationUpdate200ResponseBodySchema>;
export type ConversationUpdateResponseBody = z.infer<typeof ZodConversationUpdateResponseBodySchema>;