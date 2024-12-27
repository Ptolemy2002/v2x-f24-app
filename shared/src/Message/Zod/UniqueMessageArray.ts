import { z } from "zod";
import { Message, MongoMessage, ZodMessageSchema, ZodMongoMessageSchema } from "./Message";
import { swaggerRegistry } from "src/Swagger";

function refineUniqueMessages(messages: Message[] | MongoMessage[]) {
    const seenIds = new Set<string>();
    for (const message of messages) {
        if (seenIds.has(message.id)) {
            return false;
        }
        seenIds.add(message.id);
    }
    return true;
}

export const ZodUniqueMessageArraySchema = swaggerRegistry.register(
    "UniqueMessageArray",
    z.array(ZodMessageSchema).refine(
        refineUniqueMessages,
        { message: "Duplicate message IDs found." }
    ).openapi({
        description: "An array of messages with unique IDs."
    })
);

export const ZodUniqueMongoMessageArraySchema = swaggerRegistry.register(
    "UniqueMongoMessageArray",
    z.array(ZodMongoMessageSchema).refine(
        refineUniqueMessages,
        { message: "Duplicate message IDs found." }
    ).openapi({
        description: "An array of MongoDB messages with unique IDs."
    })
);

export type UniqueMessageArray = z.infer<typeof ZodUniqueMessageArraySchema>;
export type UniqueMongoMessageArray = z.infer<typeof ZodUniqueMongoMessageArraySchema>;