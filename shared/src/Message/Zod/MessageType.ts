import { z } from "zod";
import { MessageTypeEnum } from "src/Message/Other";
import { swaggerRegistry } from "src/Swagger";

export const ZodMessageTypeSchema = swaggerRegistry.register(
    "MessageType",
    z.enum(MessageTypeEnum).openapi({
        description: "The possible types of a message."
    })
);

export type MessageType = z.infer<typeof ZodMessageTypeSchema>;
