import { swaggerRegistry } from "src/Swagger";
import { z } from "zod";
import { ZodConversationIDWithAnonymousSchema } from "src/Message";
import { acceptedFileTypes } from "../Other";
import { SchemaObject } from "openapi3-ts/oas31";

// We won't have response schemas here because the output is a file,
// not a JSON response. Instead, we will directly define the response
// in Swagger format.

export const ConversationDownloadResponse = swaggerRegistry.registerComponent("responses", "ConversationDownloadResponse", {
    content: acceptedFileTypes.reduce((acc, type) => {
        acc[type] = {
            schema: {
                type: "string",
                format: "binary"
            }
        };
        return acc;
    }, {} as Record<string, { schema: SchemaObject }>),
    description: "The response for a conversation download request"
});

export const ZodConversationDownloadURLParamsSchema = swaggerRegistry.register(
    "ConversationDownloadURLParams",
    z.object({
        id: ZodConversationIDWithAnonymousSchema,
        file: z.string().openapi({
            description: "The key of the file to download, as provided in the `files` field of the conversation object."
        })
    }).openapi({
        description: "The URL parameters for uploading files to a conversation"
    })
);


export type ConversationDownloadURLParams = z.infer<typeof ZodConversationDownloadURLParamsSchema>;