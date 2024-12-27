import { asyncErrorHandler } from '@ptolemy2002/express-utils';
import express from 'express';
import { ConversationGetParams, ConversationGetResponseBody, createMongoTextMessage, ZodConversationGetParamsSchema } from 'shared';
import getEnv from 'env';
import { interpretZodError } from '@ptolemy2002/regex-utils';
const router = express.Router();

router.get<
    // Path
    "/get/:id",
    // Parameters
    ConversationGetParams,
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
            schema: {
                $ref: "#/components/schemas/ConversationGet200ResponseBody"
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
                        message: "No conversation found with the specified ID.",
                        help: "http://example.com/docs"
                    }
                }
            }
        }
        #swagger.end
    */
    const env = getEnv();
    const help = env.getDocsURL(1) + "/#/Conversation/get_api_v1_conversation_get__id_";
    
    const { success, data, error } = ZodConversationGetParamsSchema.safeParse(req.params);

    if (!success) {
        res.status(400).json({
            ok: false,
            code: "BAD_URL",
            message: interpretZodError(error),
            help
        });

        return;
    }

    const { id } = data;

    // Simulate a delay
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 4000 + 1000));

    if (id === "demo") {
        res.json({
            ok: true,
            conversation: {
                _id: "demo",
                messages: [
                    createMongoTextMessage(
                        "recepient",
                        () => ({
                            text: "Hello! How can I assist you today?"
                        })
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