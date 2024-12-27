import { ZodMongoConversationSchema } from "src/Message";
import { z } from "zod";

export const ZodBotQueryRequestBodySchema = z.object({
    conversation: ZodMongoConversationSchema
});
export type BotQueryRequestBody = z.infer<typeof ZodBotQueryRequestBodySchema>;
