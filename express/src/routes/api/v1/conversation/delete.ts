import { asyncErrorHandler } from '@ptolemy2002/express-utils';
import express from 'express';
import { ConversationDelete200ResponseBody, ZodConversationDeleteURLParamsSchema } from 'shared';
import RouteHandler, { RouteHandlerRequestData } from 'lib/RouteHandler';
import ConversationModel from 'models/ConversationModel';
import { ApiError } from '@google-cloud/storage';

export const router = express.Router();

export class DeleteConversationHandler extends RouteHandler<ConversationDelete200ResponseBody> {
    /*
        #swagger.start
        #swagger.path = '/api/v1/conversation/delete/{id}'
        #swagger.method = 'delete'
        #swagger.description = 'Delete a conversation by ID and all associated files.'
        #swagger.parameters['id'] = {
            description: 'ID of the conversation to delete',
            type: 'string'
        }
        #swagger.responses[200] = {
            description: "Conversation deleted successfully",
            schema: {
                $ref: "#/components/schemas/ConversationDelete200ResponseBody"
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
        super(1, "/#/Conversation/delete_api_v1_conversation_delete__id_");
    }

    async generateResponse(req: RouteHandlerRequestData) {
        // Validate the URL parameters
        const { success, data, error } = ZodConversationDeleteURLParamsSchema.safeParse(req.params);

        if (!success) {
            return {
                response: this.buildZodErrorResponse(error, "BAD_URL"),
                status: 400
            };
        }

        const { id } = data;

        // Find the conversation
        const conversation = await ConversationModel.findById(id);

        if (conversation === null) {
            return {
                status: 404,
                response: this.buildNotFoundResponse("No conversation found with the specified ID.")
            };
        }

        // Get all file keys associated with this conversation
        const fileKeys = Object.keys(conversation.files);

        // Delete all files from Google Cloud Storage
        for (const fileKey of fileKeys) {
            try {
                await ConversationModel.removeFile(id, fileKey);
            } catch (err) {
                // Check if this is a "file doesn't exist" error (404) using instanceof
                if (err instanceof ApiError && err.code === 404) {
                    console.log(`File ${fileKey} does not exist in storage for conversation ${id}, skipping.`);
                } else {
                    console.error(`Error deleting file ${fileKey} for conversation ${id}:`, err);
                }
                // Continue with other files even if one fails
            }
        }

        // Delete the conversation from MongoDB
        await ConversationModel.findByIdAndDelete(id);

        return {
            status: 200,
            response: this.buildSuccessResponse({
                deleted: true
            })
        };
    }
}

router.delete('/delete/:id', asyncErrorHandler(async (req, res) => {
    // #swagger.ignore = true
    const handler = new DeleteConversationHandler();
    return await handler.handle(req, res);
}));

const conversationDeleteRouter = router;
export default conversationDeleteRouter;