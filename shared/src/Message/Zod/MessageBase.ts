import { z } from "zod";
import { ZodMessageOriginSchema } from "./MessageOrigin";
import { ZodMessageTypeSchema } from "./MessageType";
import { swaggerRegistry } from "src/Swagger";

export const ZodMessageBaseSchema = swaggerRegistry.register(
    "MessageBase",
    z.object({
        id: z.string()
            .openapi({
                description: "The ID for the message.",
                example: "abc123"
            }),
        origin: ZodMessageOriginSchema,
        type: ZodMessageTypeSchema,
        date: z.date({invalid_type_error: "date must be a Date object."})
            .openapi({
                description: "The date the message was initially sent.",
                example: 'new Date("2021-01-01T00:00:00.000Z")'
            })
    }).openapi({
        description: "The base schema for a message."
    })
);

export const ZodMongoMessageBaseSchema = swaggerRegistry.register(
    "MongoMessageBase",
    ZodMessageBaseSchema.omit({
        date: true
    }).merge(z.object({
        date: z.string({invalid_type_error: "Mongo only supports string dates."})
            .openapi({
                description: "The date the message was initially sent.",
                example: "2021-01-01T00:00:00.000Z"
            })
    })).openapi({
        description: "The MongoDB representation of the base schema for a message."
    })
);

export type MessageBase = z.infer<typeof ZodMessageBaseSchema>;
export type MongoMessageBase = z.infer<typeof ZodMongoMessageBaseSchema>;
