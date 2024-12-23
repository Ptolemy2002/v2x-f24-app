import express from 'express';
import defaultResponses from 'data/default-responses.json';
import { asyncErrorHandler } from '@ptolemy2002/express-utils';
import {
    BotQueryResponseBody,
    createMessage,
    BotQueryRequestBody,
    MongoConversationSchema
} from 'shared';
import getEnv from 'env';
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

router.post<
    // Path
    "/query",
    // Parameters
    {},
    BotQueryResponseBody,
    BotQueryRequestBody
>("/query", asyncErrorHandler(async (req, res) => {
        /*
            #swagger.start
            #swagger.path = '/api/v1/bot/query'
            #swagger.method = 'post'`
            #swagger.description = 'Query the bot for a response.'
            #swagger.requestBody = {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            $conversation: {
                                $ref: '#/components/schemas/MongoConversation'
                            },
                            help: 'https://example.com/docs'
                        },

                        example: {
                            conversation: {
                                _id: "abc123",
                                messages: [
                                    {
                                        type: "text",
                                        origin: "recepient",
                                        date: "2021-06-01T00:00:00.000Z",
                                        text: "Hello, World!"
                                    }
                                ]
                            }
                        }
                    }
                }
            }
            #swagger.responses[200] = {
                description: "Response from the bot.",
                content: {
                    "application/json": {
                        schema: {
                            newMessage: {
                                $ref: "#/components/schemas/MongoMessage"
                            },
                            help: "https://example.com/docs"
                        },

                        example: {
                            newMessage: {
                                type: "text",
                                origin: "recepient",
                                date: "2021-06-01T00:00:00.000Z",
                                text: "Hello, World!"
                            }
                        }
                    }
                }
            }
            #swagger.end
        */
        const env = getEnv();
        const help = env.apiUrl + "/api/v1/docs/#/Bot/post_api_v1_bot_query";
        const {success, error, data} = MongoConversationSchema.safeParse(req.body.conversation);

        if (!success) {
            res.status(400).json({
                ok: false,
                code: "BAD_INPUT",
                message: error.message,
                help
            });
            return;
        }

        // Simulate a delay
        await new Promise((resolve) => setTimeout(resolve, Math.random() * 4000 + 1000));

        const messages = data.messages;
        const lastMessage = messages[messages.length - 1];

        if (!lastMessage) {
            // This is the first message, so we'll just greet the user.
            res.status(200).json({
                ok: true,
                newMessage: createMessage("text", "recepient", () => ({
                    text: "Greetings! How can I help you today?"
                }), true),
                help
            });
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
            res.status(200).json({
                ok: true,
                newMessage: createMessage("text", "recepient", () => ({
                    text: response.text ?? "[No text provided]"
                }), true),
                help
            });
            return;
        } else if (response.type === "image") {
            if (!response.src) {
                res.status(200).json({
                    ok: true,
                    newMessage: createMessage("text", "recepient", () => ({
                        text: "I'm sorry, I had trouble sending an image."
                    }), true)
                });
                return;
            } else {
                res.status(200).json({
                    ok: true,
                    newMessage: createMessage("image", "recepient", () => ({
                        src: response.src!,
                        alt: response.alt ?? "[No alt text provided]"
                    }), true),
                    help
                });
                return;
            }
        } else if (response.type === "audio") {
            if (!response.src) {
                res.status(200).json({
                    ok: true,
                    newMessage: createMessage("text", "recepient", () => ({
                        text: "I'm sorry, I had trouble sending an audio message."
                    }), true),
                    help
                });
                return;
            } else {
                res.status(200).json({
                    ok: true,
                    newMessage: createMessage("audio", "recepient", () => ({
                        src: response.src!
                    }), true),
                    help
                });
                return;
            }
        }

        res.status(500).json({
            ok: false,
            code: "INTERNAL",
            message: "Unknown response type.",
            help
        });
    })
);

const botRouter = router;
export default botRouter;