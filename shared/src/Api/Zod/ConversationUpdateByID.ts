import { parseConversationPath, ZodConversationIDSchema, ZodMongoConversationSchema } from "src/Message";
import { swaggerRegistry } from "src/Swagger";
import { z } from "zod";
import { zodSuccessResponseSchema } from "./SuccessResponse";
import { ZodErrorResponseSchema } from "./ErrorResponse";

export const ZodConversationUpdateByIDURLParamsSchema = swaggerRegistry.register(
    "ConversationUpdateByIDURLParams",
    z.object({
        id: ZodConversationIDSchema
    }).openapi({
        description: "The URL parameters for updating a conversation"
    })
);

export const ZodConversationUpdateByIDRequestBodySchema = swaggerRegistry.register(
    "ConversationUpdateByIDRequestBody",
    z.object({
        difference: z.object({
            $set: z.record(
                z.string().refine((s) => parseConversationPath(s, [{
                    key: "name",
                    allowNested: false
                }]), {
                    message: "Invalid path"
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
                z.string().refine((s) => parseConversationPath(s, [{
                    key: "name",
                    allowDirect: false,
                    allowNested: false
                }, {
                    key: "messages",
                    allowDirect: false,
                    allowNested: true
                }]), {
                    message: "Invalid path"
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
                z.string().refine((s) => parseConversationPath(s, [{
                    key: "name",
                    allowDirect: false,
                    allowNested: false
                }, {
                    key: "messages",
                    allowDirect: true,
                    allowNested: false
                }]), {
                    message: "Invalid path"
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
                                type: "text",
                                origin: "sender",
                                text: "Hello, world!"
                            }
                        ]
                    }
                }
            }),

            $pullAll: z.record(
                z.string().refine((s) => parseConversationPath(s, [{
                    key: "name",
                    allowDirect: false,
                    allowNested: false
                }, {
                    key: "messages",
                    allowDirect: true,
                    allowNested: false
                }]), {
                    message: "Invalid path"
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

export const ZodConversationUpdateByID200ResponseBodySchema = swaggerRegistry.register(
    "UpdateConversationByID200ResponseBody",
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

export const ZodConversationUpdateByIDResponseBodySchema = swaggerRegistry.register(
    "UpdateConversationByIDResponseBody",
    z.union([
        ZodConversationUpdateByID200ResponseBodySchema,
        ZodErrorResponseSchema
    ]).openapi({
        description: "The response for updating a conversation"
    })
);

export type ConversationUpdateByIDURLParams = z.infer<typeof ZodConversationUpdateByIDURLParamsSchema>;

export type ConversationUpdateByIDRequestBodyInput = z.input<typeof ZodConversationUpdateByIDRequestBodySchema>;
export type ConversationUpdateByIDRequestBodyOutput = z.output<typeof ZodConversationUpdateByIDRequestBodySchema>;

export type ConversationUpdateByID200ResponseBody = z.infer<typeof ZodConversationUpdateByID200ResponseBodySchema>;
export type ConversationUpdateByIDResponseBody = z.infer<typeof ZodConversationUpdateByIDResponseBodySchema>;