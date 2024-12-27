import { z } from "zod";
import { MessageOriginEnum } from "src/Message/Other";
import { swaggerRegistry } from "src/Swagger";

export const ZodMessageOriginSchema = swaggerRegistry.register(
    "MessageOrigin",
    z.enum(MessageOriginEnum).openapi({
        description: "The possible origins of a message."
    })
);

export type MessageOrigin = z.infer<typeof ZodMessageOriginSchema>;
