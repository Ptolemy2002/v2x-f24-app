import { asyncErrorHandler } from '@ptolemy2002/express-utils';
import express from 'express';
import { ConversationGet200ResponseBody, createMongoTextMessage, ZodConversationGetURLParamsSchema } from 'shared';
import RouteHandler, { RouteHandlerRequestData } from 'lib/RouteHandler';
import ConversationModel from 'models/ConversationModel';
export const router = express.Router();

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

    async generateResponse(req: RouteHandlerRequestData) {
        const { success, data, error } = ZodConversationGetURLParamsSchema.safeParse(req.params);

        if (!success) {
            return {
                response: this.buildZodErrorResponse(error, "BAD_URL"),
                status: 400
            };
        }

        const { id } = data;

        const conversation = await ConversationModel.findById(id);

        if (conversation === null) {
            return {
                status: 404,
                response: this.buildNotFoundResponse("No conversation found with the specified ID.")
            };
        }

        return {
            status: 200,
            response: this.buildSuccessResponse({
                conversation: conversation.toClientJSON()
            })
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
