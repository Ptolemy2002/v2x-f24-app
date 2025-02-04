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
    BotQuery200ResponseBody,
    MongoMessage
} from 'shared';
import RouteHandler, { RouteHandlerRequest } from 'lib/RouteHandler';
import ConversationModel from 'models/ConversationModel';
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

        #swagger.responses[404] = {
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/ErrorResponse404"
                    },

                    example: {
                        ok: false,
                        code: "NOT_FOUND",
                        message: "Could not find the original conversation in the database to update.",
                        help: "http://example.com/docs"
                    }
                }
            }
        }
        #swagger.end
    */
    constructor() {
        super(1, "/#/Bot/post_api_v1_bot_query");
    }

    async generateResponse(req: RouteHandlerRequest) {
        const {success: bodySuccess, error: bodyError, data: body} = ZodBotQueryRequestBodySchema.safeParse(req.body);

        if (!bodySuccess) {
            return {
                status: 400,
                response: this.buildZodErrorResponse(bodyError, "BAD_BODY")
            };
        }

        // Simulate a delay
        await new Promise((resolve) => setTimeout(resolve, Math.random() * 4000 + 1000));

        const messages = body.conversation.messages;
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

        let newMessage: MongoMessage;
        if (response.type === "text") {
            newMessage = createMongoTextMessage("recepient", () => ({
                text: response.text ?? "[No text provided]"
            }));
        } else if (response.type === "image") {
            if (!response.src) {
                newMessage = createMongoTextMessage("recepient", () => ({
                    text: "I'm sorry, I had trouble sending an image."
                }));
            } else {
                newMessage = createMongoImageMessage("recepient", () => ({
                    src: response.src!,
                    alt: response.alt ?? "[No alt text provided]"
                }));
            }
        } else if (response.type === "audio") {
            if (!response.src) {
                newMessage = createMongoTextMessage("recepient", () => ({
                    text: "I'm sorry, I had trouble sending an audio message."
                }));
            } else {
                newMessage = createMongoAudioMessage("recepient", () => ({
                    src: response.src!
                }));
            }
        } else {
            return {
                status: 500,
                response: this.buildErrorResponse("INTERNAL", "Unknown response type.")
            };
        }

        if (body.conversation._id !== "anonymous") {
            // Update the database with the new message
            const conversation = await ConversationModel.findById(body.conversation._id);
            if (conversation) {
                // Update the conversation in the database
                conversation.name = body.conversation.name;
                conversation.messages = [...body.conversation.messages, newMessage];
                await conversation.save();
            } else {
                return {
                    status: 404,
                    response: this.buildNotFoundResponse(
                        "Could not find the original conversation in the database to update."
                    )
                };
            }
        }

        return {
            status: 200,
            response: this.buildSuccessResponse({
                newMessage
            })
        };
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