import { date, z } from "zod";
import { MessageOriginEnum, MessageTypeEnum } from "./Other";

export const ZodMessageOriginSchema = z.enum(MessageOriginEnum);
export const ZodMessageTypeSchema = z.enum(MessageTypeEnum);

export const ZodMessageBaseSchema = z.object({
    id: z.string(),
    origin: ZodMessageOriginSchema,
    type: ZodMessageTypeSchema,
    date: z.date({invalid_type_error: "date must be a Date object."})
});

export const ZodMongoMessageBaseSchema = ZodMessageBaseSchema.omit({
    date: true
}).merge(z.object({
    date: z.string({invalid_type_error: "Mongo only supports string dates."})
}));

export const ZodTextMessageBaseSchema = z.object({
    text: z.string()
});
export const ZodTextMessageSchema = ZodMessageBaseSchema.merge(ZodTextMessageBaseSchema).merge(z.object({
    type: z.literal("text")
}));
export const ZodMongoTextMessageSchema = ZodMongoMessageBaseSchema.merge(ZodTextMessageBaseSchema).merge(z.object({
    type: z.literal("text")
}));

export const ZodImageMessageBaseSchema = z.object({
    src: z.string(),
    alt: z.string()
});
export const ZodImageMessageSchema = ZodMessageBaseSchema.merge(ZodImageMessageBaseSchema).merge(z.object({
    type: z.literal("image")
}));
export const ZodMongoImageMessageSchema = ZodMongoMessageBaseSchema.merge(ZodImageMessageBaseSchema).merge(z.object({
    type: z.literal("image")
}));

export const ZodAudioMessageBaseSchema = z.object({
    src: z.string()
});
export const ZodAudioMessageSchema = ZodMessageBaseSchema.merge(ZodAudioMessageBaseSchema).merge(z.object({
    type: z.literal("audio")
}));
export const ZodMongoAudioMessageSchema = ZodMongoMessageBaseSchema.merge(ZodAudioMessageBaseSchema).merge(z.object({
    type: z.literal("audio")
}));

export const ZodMessageSchema = z.union([ZodTextMessageSchema, ZodImageMessageSchema, ZodAudioMessageSchema]);
export const ZodMongoMessageSchema = z.union([ZodMongoTextMessageSchema, ZodMongoImageMessageSchema, ZodMongoAudioMessageSchema]);

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

export const ZodUniqueMessageArraySchema = z.array(ZodMessageSchema).refine(
    refineUniqueMessages,
    { message: "Duplicate message IDs found." }
);

export const ZodUniqueMongoMessageArraySchema = z.array(ZodMongoMessageSchema).refine(
    refineUniqueMessages,
    { message: "Duplicate message IDs found." }
);

export const ZodConversationSchema = z.object({
    id: z.string(),
    messages: ZodUniqueMessageArraySchema
});

export const ZodMongoConversationSchema = z.object({
    _id: z.string(),
    messages: ZodUniqueMongoMessageArraySchema
});

export type MessageOrigin = z.infer<typeof ZodMessageOriginSchema>;
export type MessageType = z.infer<typeof ZodMessageTypeSchema>;

export type MessageBase = z.infer<typeof ZodMessageBaseSchema>;
export type MongoMessageBase = z.infer<typeof ZodMongoMessageBaseSchema>;

export type TextMessageBase = z.infer<typeof ZodTextMessageBaseSchema>;
export type TextMessage = z.infer<typeof ZodTextMessageSchema>;
export type MongoTextMessage = z.infer<typeof ZodMongoTextMessageSchema>;

export type ImageMessageBase = z.infer<typeof ZodImageMessageBaseSchema>;
export type ImageMessage = z.infer<typeof ZodImageMessageSchema>;
export type MongoImageMessage = z.infer<typeof ZodMongoImageMessageSchema>;

export type AudioMessageBase = z.infer<typeof ZodAudioMessageBaseSchema>;
export type AudioMessage = z.infer<typeof ZodAudioMessageSchema>;
export type MongoAudioMessage = z.infer<typeof ZodMongoAudioMessageSchema>;

export type Message = z.infer<typeof ZodMessageSchema>;
export type MongoMessage = z.infer<typeof ZodMongoMessageSchema>;

export type Conversation = z.infer<typeof ZodConversationSchema>;
export type MongoConversation = z.infer<typeof ZodMongoConversationSchema>;