import { Conversation, MongoConversation, MongoMessage } from "./Message";

export type ErrorCode = "UNKNOWN" | "BAD_INPUT" | "INTERNAL" | "NOT_FOUND" | "NOT_IMPLEMENTED";
export type ErrorResponse = {ok: false, code: ErrorCode, message: string, help?: string};

export type SuccessResponse<T={}> = T & {ok: true, help?: string};

export type BotQueryResponseBody = SuccessResponse<{newMessage: MongoMessage}> | ErrorResponse;
export type BotQueryRequestBody = {conversation: Conversation};

export type ConversationGetResponseBody = SuccessResponse<{conversation: MongoConversation}> | ErrorResponse;