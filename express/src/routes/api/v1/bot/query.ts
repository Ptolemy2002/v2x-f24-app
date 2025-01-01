import express from 'express';
import defaultResponses from 'data/default-responses.json';
import { asyncErrorHandler } from '@ptolemy2002/express-utils';
import {
    BotQueryResponseBody,
    BotQueryRequestBody,
    createMongoTextMessage,
    createMongoImageMessage,
    createMongoAudioMessage,
    ZodBotQueryRequestBodySchema,
    BotQuery200ResponseBody
} from 'shared';
import RouteHandler, { RouteHandlerRequest } from 'lib/RouteHandler';
const router = express.Router();

type DefaultResponseData = {
    type: string;
    triggers?: string[];
    text?: string;
    src?: string;
    alt?: string;
};

function cleanText(text: string): string {
    // Convert to lowercase
    text = text.toLowerCase();
    // Replace non-alphanumeric characters with spaces
    text = text.replace(/[^a-z0-9]/g, " ");
    // Replace multiple spaces with a single space
    text = text.replace(/\s+/g, " ");
    // Remove leading and trailing whitespace
    text = text.trim();
    return text;
}

function findMatchingResponse(text: string): DefaultResponseData | null {
    text = cleanText(text);
    for (const response of defaultResponses.other) {
        for (const trigger of (response.triggers ?? [])) {
            if (text === cleanText(trigger)) {
                return response;
            }
        }
    }

    return null;
}

export class BotQueryHandler extends RouteHandler<BotQuery200ResponseBody> {
    /*
        #swagger.start
        #swagger.path = '/api/v1/bot/query'
        #swagger.method = 'post'`
        #swagger.description = 'Query the bot for a response.'
        #swagger.requestBody = {
            required: true,
            schema: {
                $ref: "#/components/schemas/BotQueryRequestBody"
            }
        }
        #swagger.responses[200] = {
            schema: {
                $ref: "#/components/schemas/BotQuery200ResponseBody"
            }
        }
        #swagger.end
    */
    constructor() {
        super(1, "/#/Bot/post_api_v1_bot_query");
    }

    async generateResponse(req: RouteHandlerRequest) {
        const {success, error, data} = ZodBotQueryRequestBodySchema.safeParse(req.body);

        if (!success) {
            return {
                status: 400,
                response: this.buildZodErrorResponse(error, "BAD_BODY")
            };
        }

        // Simulate a delay
        await new Promise((resolve) => setTimeout(resolve, Math.random() * 4000 + 1000));

        const messages = data.conversation.messages;
        const lastMessage = messages[messages.length - 1];

        if (!lastMessage) {
            // This is the first message, so we'll just greet the user.
            return {
                status: 200,
                response: this.buildSuccessResponse({
                    newMessage: createMongoTextMessage("recepient", () => ({
                        text: "Greetings! How can I help you today?"
                    }))
                })
            };
        }

        let response: DefaultResponseData = defaultResponses["[default]"];
        if (lastMessage.type === "image") {
            response = defaultResponses["[image]"];
        } else if (lastMessage.type === "audio") {
            response = defaultResponses["[audio]"];
        } else {
            const matchingResponse = findMatchingResponse(lastMessage.text);
            if (matchingResponse) {
                response = matchingResponse;
            }
        }

        if (response.type === "text") {
            return {
                status: 200,
                response: this.buildSuccessResponse({
                    newMessage: createMongoTextMessage("recepient", () => ({
                        text: response.text ?? "[No text provided]"
                    }))
                })
            };
        } else if (response.type === "image") {
            if (!response.src) {
                return {
                    status: 200,
                    response: this.buildSuccessResponse({
                        newMessage: createMongoTextMessage("recepient", () => ({
                            text: "I'm sorry, I had trouble sending an image."
                        }))
                    })
                };
            } else {
                return {
                    status: 200,
                    response: this.buildSuccessResponse({
                        newMessage: createMongoImageMessage("recepient", () => ({
                            src: response.src!,
                            alt: response.alt ?? "[No alt text provided]"
                        }))
                    })
                };
            }
        } else if (response.type === "audio") {
            if (!response.src) {
                return {
                    status: 200,
                    response: this.buildSuccessResponse({
                        newMessage: createMongoTextMessage("recepient", () => ({
                            text: "I'm sorry, I had trouble sending an audio message."
                        }))
                    })
                };
            } else {
                return {
                    status: 200,
                    response: this.buildSuccessResponse({
                        newMessage: createMongoAudioMessage("recepient", () => ({
                            src: response.src!
                        }))
                    })
                };
            }
        } else {
            return {
                status: 500,
                response: this.buildErrorResponse("INTERNAL", "Unknown response type.")
            };
        }
    }
}

router.post<
    // Path
    "/query",
    // Parameters
    {},
    BotQueryResponseBody,
    BotQueryRequestBody
>("/query", asyncErrorHandler(async (req, res) => {
    // #swagger.ignore = true
    const handler = new BotQueryHandler();
    return await handler.handle(req, res);
}));

const botQueryRouter = router;
export default botQueryRouter;