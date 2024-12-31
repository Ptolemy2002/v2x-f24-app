import express, { Request, Response } from 'express';
import defaultResponses from 'data/default-responses.json';
import { asyncErrorHandler } from '@ptolemy2002/express-utils';
import { interpretZodError } from '@ptolemy2002/regex-utils';
import {
    BotQueryResponseBody,
    BotQueryRequestBody,
    createMongoTextMessage,
    createMongoImageMessage,
    createMongoAudioMessage,
    ZodBotQueryRequestBodySchema,
    BotQuery200ResponseBody
} from 'shared';
import getEnv from 'env';
import RouteHandler from 'lib/RouteHandler';
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

export class BotQueryHandler extends RouteHandler {
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

    async handle(req: Request, res: Response) {
        const {success, error, data} = ZodBotQueryRequestBodySchema.safeParse(req.body);

        if (!success) {
            res.status(400).json(this.buildZodErrorResponse(error, "BAD_BODY"));
            return;
        }

        // Simulate a delay
        await new Promise((resolve) => setTimeout(resolve, Math.random() * 4000 + 1000));

        const messages = data.conversation.messages;
        const lastMessage = messages[messages.length - 1];

        if (!lastMessage) {
            // This is the first message, so we'll just greet the user.
            res.status(200).json(this.buildSuccessResponse<BotQuery200ResponseBody>({
                newMessage: createMongoTextMessage("recepient", () => ({
                    text: "Greetings! How can I help you today?"
                }))
            }));
            return;
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
            res.status(200).json(this.buildSuccessResponse<BotQuery200ResponseBody>({
                newMessage: createMongoTextMessage("recepient", () => ({
                    text: response.text ?? "[No text provided]"
                }))
            }));
            return;
        } else if (response.type === "image") {
            if (!response.src) {
                res.status(200).json(this.buildSuccessResponse<BotQuery200ResponseBody>({
                    newMessage: createMongoTextMessage("recepient", () => ({
                        text: "I'm sorry, I had trouble sending an image."
                    }))
                }));
                return;
            } else {
                res.status(200).json(this.buildSuccessResponse<BotQuery200ResponseBody>({
                    newMessage: createMongoImageMessage("recepient", () => ({
                        src: response.src!,
                        alt: response.alt ?? "[No alt text provided]"
                    }))
                }));
                return;
            }
        } else if (response.type === "audio") {
            if (!response.src) {
                res.status(200).json(this.buildSuccessResponse<BotQuery200ResponseBody>({
                    newMessage: createMongoTextMessage("recepient", () => ({
                        text: "I'm sorry, I had trouble sending an audio message."
                    }))
                }));
                return;
            } else {
                res.status(200).json(this.buildSuccessResponse<BotQuery200ResponseBody>({
                    newMessage: createMongoAudioMessage("recepient", () => ({
                        src: response.src!
                    }))
                }));
                return;
            }
        }

        res.status(500).json(this.buildErrorResponse("INTERNAL", "Unknown response type."));
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