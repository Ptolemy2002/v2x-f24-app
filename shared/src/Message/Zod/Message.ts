import { z } from "zod";
import { ZodTextMessageSchema, ZodMongoTextMessageSchema } from "./TextMessage";
import { ZodImageMessageSchema, ZodMongoImageMessageSchema } from "./ImageMessage";
import { ZodAudioMessageSchema, ZodMongoAudioMessageSchema } from "./AudioMessage";
import { swaggerRegistry } from "src/Swagger";

export const ZodMessageSchema = swaggerRegistry.register(
    "Message",
    z.union([ZodTextMessageSchema, ZodImageMessageSchema, ZodAudioMessageSchema]).openapi({
        description: "A message."
    })
);

export const ZodMongoMessageSchema = swaggerRegistry.register(
    "MongoMessage",
    z.union([ZodMongoTextMessageSchema, ZodMongoImageMessageSchema, ZodMongoAudioMessageSchema]).openapi({
        description: "The MongoDB representation of a message."
    })
);

export type Message = z.infer<typeof ZodMessageSchema>;
export type MongoMessage = z.infer<typeof ZodMongoMessageSchema>;