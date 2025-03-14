import { swaggerRegistry } from "src/Swagger";
import { zodSuccessResponseSchema } from "./SuccessResponse";
import { z } from "zod";
import { ZodErrorResponseSchema } from "./ErrorResponse";
import { ZodFileMimeTypeSchema } from "./FileMimeType";
import { ZodConversationFileEntrySchema, ZodConversationIDWithAnonymousSchema } from "src/Message";
import { ZodAltQueryParamSchema } from "./QueryParams";

export const ZodConversationUpload200ResponseBodySchema = swaggerRegistry.register(
    "ConversationUpload200ResponseBody",
    zodSuccessResponseSchema(z.object({
        uploaded: z.literal(true),
        newFiles: z.array(ZodConversationFileEntrySchema).openapi({
            description: "The entries for each newly uploaded file"
        })
    }).openapi({
        description: "The response body for the conversation upload endpoint"
    }))
);

export const ZodConversationUploadResponseBody = swaggerRegistry.register(
    "ConversationUploadResponseBody",
    z.union([
        ZodConversationUpload200ResponseBodySchema,
        ZodErrorResponseSchema
    ]).openapi({
        description: "The response body for the conversation upload endpoint"
    })
);

export const ZodConversationUploadURLParamsSchema = swaggerRegistry.register(
    "ConversationUploadURLParams",
    z.object({
        id: ZodConversationIDWithAnonymousSchema
    }).openapi({
        description: "The URL parameters for uploading files to a conversation"
    })
);

export const ZodConversationUploadQueryParamsSchema = swaggerRegistry.register(
    "ConversationUploadQueryParams",
    z.object({
        alts: ZodAltQueryParamSchema.optional()
    }).openapi({
        description: "The query parameters for the conversation upload endpoint"
    })
);

export const ZodConversationUploadFilesSchema = swaggerRegistry.register(
    "ConversationUploadFiles",
    z.array(
        z.object({
            mimetype: ZodFileMimeTypeSchema.optional(),
            type: ZodFileMimeTypeSchema.optional()
                .openapi({
                    description: "Alternative to mimetype"
                }),
            size: z.number()
                .positive()
                .refine(
                    // 10 MB
                    (v) => v <= 10 * 1024 * 1024,
                    {
                        message: "File size larger than 10 MB"
                    }
                )
                .openapi({
                    description: "The size of the file in bytes"
                }),
        })
        .passthrough()
        .refine(
            (v) => v.mimetype !== undefined || v.type !== undefined,
            {
                message: "Either mimetype or type must be provided"
            }
        )
        .transform((v) => {
            if (v.mimetype !== undefined) {
                v.type = v.mimetype;
            } else if (v.type !== undefined) {
                v.mimetype = v.type;
            }

            // Make every key required because we've filled in the missing values
            type V = typeof v;
            return v as {
                [K in keyof V]-?: V[K];
            };
        })
        .openapi({
            description: "The files to upload. Must specify either mimetype or type. Size must be less than or equal to 10 MB"
        })
    ).min(1, {
        message: "At least one file must be provided"
    })
);

export type ConversationUploadURLParams = z.infer<typeof ZodConversationUploadURLParamsSchema>;
export type ConversationUpload200ResponseBody = z.infer<typeof ZodConversationUpload200ResponseBodySchema>;
export type ConversationUploadResponseBody = z.infer<typeof ZodConversationUploadResponseBody>;
export type ConversationUploadFiles = z.infer<typeof ZodConversationUploadFilesSchema>;
export type ConversationUploadQueryParamsInput = z.input<typeof ZodConversationUploadQueryParamsSchema>;
export type ConversationUploadQueryParamsOutput = z.output<typeof ZodConversationUploadQueryParamsSchema>;