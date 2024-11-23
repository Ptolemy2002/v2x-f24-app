import { Conversation, MongoMessage } from "src/Message";

export type ErrorCode = "UNKNOWN" | "BAD_INPUT" | "INTERNAL";
export type ErrorResponse = {ok: false, code: ErrorCode, message: string};

export type BotQueryResponseBody = {ok: true, newMessage: MongoMessage} | ErrorResponse;
export type BotQueryRequestBody = {conversation: Conversation};