import { ValueOf } from "@ptolemy2002/ts-utils";
import { ErrorCodeEnum } from "./Other";
import { MongoConversation, MongoMessage } from "../Message";

export type ErrorCode = Extract<ValueOf<typeof ErrorCodeEnum>, string>;
export type ErrorResponse = {ok: false, code: ErrorCode, message: string | string[] | null, help?: string};
export type SuccessResponse<T={}> = T & {ok: true, help?: string};

export type BotQueryResponseBody = SuccessResponse<{newMessage: MongoMessage}> | ErrorResponse;

export type ConversationGetResponseBody = SuccessResponse<{conversation: MongoConversation}> | ErrorResponse;