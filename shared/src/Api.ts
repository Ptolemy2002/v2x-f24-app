import { Conversation, MongoConversation, MongoMessage } from "./Message";

export type ErrorCode = "UNKNOWN" | "BAD_INPUT" | "INTERNAL" | "NOT_FOUND" | "NOT_IMPLEMENTED";
export type ErrorResponse = {ok: false, code: ErrorCode, message: string};

export type BotQueryResponseBody = {ok: true, newMessage: MongoMessage} | ErrorResponse;
export type BotQueryRequestBody = {conversation: Conversation};

export type ConversationGetResponseBody = {ok: true, conversation: MongoConversation} | ErrorResponse;