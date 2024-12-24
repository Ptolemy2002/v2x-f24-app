import { Conversation, MongoConversation, MongoMessage } from "./Message";

export type ErrorCode = "UNKNOWN" | "BAD_INPUT" | "INTERNAL" | "NOT_FOUND" | "NOT_IMPLEMENTED";
export const SwaggerErrorCodeSchema = {
    "@enum": [
        "UNKNOWN",
        "BAD_INPUT",
        "INTERNAL",
        "NOT_FOUND",
        "NOT_IMPLEMENTED"
    ]
};

export type ErrorResponse = {ok: false, code: ErrorCode, message: string, help?: string};
export const SwaggerErrorResponseSchema = {
    type: "object",
    properties: {
        ok: {
            type: "boolean",
            required: true,
            enum: [false]
        },
        code: {
            type: "string",
            required: true,
            enum: SwaggerErrorCodeSchema["@enum"]
        },

        message: {
            oneOf: [
                {type: "string"},
                {type: "array", items: {type: "string"}},
                {type: "null"}
            ],
            required: true
        },
        help: {
            oneOf: [
                {type: "string"},
                {type: "null"}
            ],
            required: false
        }
    }
};

export type SuccessResponse<T={}> = T & {ok: true, help?: string};

export type BotQueryResponseBody = SuccessResponse<{newMessage: MongoMessage}> | ErrorResponse;
export type BotQueryRequestBody = {conversation: MongoConversation};

export type ConversationGetResponseBody = SuccessResponse<{conversation: MongoConversation}> | ErrorResponse;