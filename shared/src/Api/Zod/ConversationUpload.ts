import { swaggerRegistry } from "src/Swagger";
import { zodSuccessResponseSchema } from "./SuccessResponse";
import { z } from "zod";
import { ZodErrorResponseSchema } from "./ErrorResponse";
import { ZodFileMimeTypeSchema } from "./FileMimeType";

export const ZodConversationUpload200ResponseBodySchema = swaggerRegistry.register(
    "ConversationUpload200ResponseBody",
    zodSuccessResponseSchema(z.object({
        uploaded: z.literal(true)
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

export const ZodConversationUploadFilesSchema = swaggerRegistry.register(
    "ConversationUploadFile",
    z.array(
        z.object({
            mimetype: ZodFileMimeTypeSchema.optional(),
            type: ZodFileMimeTypeSchema.optional(),
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
            (v) => v.mimetype || v.type,
            {
                message: "Either mimetype or type must be provided"
            }
        )
        .openapi({
            description: "The files to upload. Must specify either mimetype or type. Size must be less than or equal to 10 MB"
        })
    ).min(1, {
        message: "At least one file must be provided"
    })
);

export type ConversationUpload200ResponseBody = z.infer<typeof ZodConversationUpload200ResponseBodySchema>;
export type ConversationUploadResponseBody = z.infer<typeof ZodConversationUploadResponseBody>;
export type ConversationUploadFiles = z.infer<typeof ZodConversationUploadFilesSchema>;