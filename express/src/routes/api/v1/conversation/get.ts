import { asyncErrorHandler } from '@ptolemy2002/express-utils';
import express from 'express';
import { ConversationGet200ResponseBody, createMongoTextMessage, ZodConversationGetURLParamsSchema } from 'shared';
import RouteHandler, { RouteHandlerRequest } from 'lib/RouteHandler';
const router = express.Router();

export class GetConversationHandler extends RouteHandler<ConversationGet200ResponseBody> {
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
    
    constructor() {
        super(1, "/#/Conversation/get_api_v1_conversation_get__id_");
    }

    async generateResponse(req: RouteHandlerRequest) {
        const { success, data, error } = ZodConversationGetURLParamsSchema.safeParse(req.params);

        if (!success) {
            return {
                response: this.buildZodErrorResponse(error, "BAD_URL"),
                status: 400
            };
        }

        const { id } = data;

        // Simulate a delay
        await new Promise((resolve) => setTimeout(resolve, Math.random() * 4000 + 1000));

        if (id === "demo") {
            return {
                status: 200,
                response: this.buildSuccessResponse({
                    conversation: {
                        _id: "demo",
                        name: "Demo Conversation",
                        messages: [
                            createMongoTextMessage(
                                "recepient",
                                () => ({
                                    text: "Hello! How can I assist you today?"
                                })
                            )
                        ]
                    }
                })
            };
        }

        return {
            status: 501,
            response: this.buildNotImplementedResponse(
                "A database is not implemented yet, so getting a non-demo conversation is not possible."
            )
        };
    }
}

router.get('/get/:id', asyncErrorHandler(async (req, res) => {
    // #swagger.ignore = true
    const handler = new GetConversationHandler();
    return await handler.handle(req, res);
}));

const conversationGetRouter = router;
export default conversationGetRouter;
