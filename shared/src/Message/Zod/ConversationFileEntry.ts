import { swaggerRegistry } from "src/Swagger";
import { z } from "zod";

export const ZodConversationFileEntrySchema = swaggerRegistry.register(
    "ConversationFileEntry",
    z.object({
        key: z.string().openapi({
            description: "The key of the file, unique among every file in the conversation."
        }),
        url: z.string().openapi({
            description: "The URL of the file."
        }),
        type: z.union([
            z.literal("image"),
            z.literal("audio"),
        ]).openapi({
            description: "The high-level type of the file - used to determine what kind of message to send when it is selected."
        }),
        alt: z.string().openapi({
            description: "The alt text for the file, if applicable."
        }).optional()
    })
    .openapi({
        description: "A file available to the conversation."
    })
);

export type ZodConversationFileEntry = z.infer<typeof ZodConversationFileEntrySchema>;