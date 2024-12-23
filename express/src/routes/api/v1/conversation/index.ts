import { asyncErrorHandler } from '@ptolemy2002/express-utils';
import express from 'express';
import { ConversationGetResponseBody, createMessage } from 'shared';
import getEnv from 'env';
const router = express.Router();

router.get<
    // Path
    "/get/:id",
    // Parameters
    { id: string },
    ConversationGetResponseBody
>('/get/:id', asyncErrorHandler(async (req, res) => {
    /*
        #swagger.start
        #swagger.path = '/api/v1/conversation/get/{id}'
        #swagger.method = 'get'
        #swagger.description = 'Get a conversation by ID.'
        #swagger.parameters['id'] = {
            description: 'ID of the conversation to get',
            type: 'string'
        }
        #swagger.responses[200] = {
            description: "Conversation found",
            content: {
                "application/json": {
                    schema: {
                        conversation: {
                            $ref: "#/components/schemas/MongoConversation"
                        }
                    },

                    example: {
                        "application/json": {
                            ok: true,
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
        }

        #swagger.responses[404] = {
            description: "Conversation not found",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/ErrorResponse"
                    },

                    example: {
                        ok: false,
                        code: "NOT_FOUND",
                        message: "Conversation not found",
                        help: "https://example.com/docs"
                    }
                }
            }
        }
        #swagger.end
    */
    const env = getEnv();
    const help = env.apiUrl + "/api/v1/docs/#/Conversation/get_api_v1_conversation_get__id_";
    const { id } = req.params;

    // Simulate a delay
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 4000 + 1000));

    if (id === "demo") {
        res.json({
            ok: true,
            conversation: {
                _id: "demo",
                messages: [
                    createMessage(
                        "text", "recepient",
                        () => ({
                            text: "Hello! How can I assist you today?"
                        }), true
                    )
                ]
            },
            help
        });

        return;
    }

    res.status(501).json({
        ok: false,
        code: "NOT_IMPLEMENTED",
        message: "A database is not implemented yet, so getting a non-demo conversation is not possible.",
        help
    });
}));

const conversationRouter = router;
export default conversationRouter;