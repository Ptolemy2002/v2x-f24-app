import { Conversation, MongoMessage } from "src/Message";

export type Response400 = {ok: false, message: string};
export type Response500 = {ok: false, message: string};

export type BotQueryResponseBody = {ok: true, newMessage: MongoMessage} | Response400 | Response500;
export type BotQueryRequestBody = {conversation: Conversation};