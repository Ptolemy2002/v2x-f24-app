import { asyncErrorHandler } from "@ptolemy2002/express-utils";
import { Router } from "express";
import RouteHandler, { RouteHandlerRequestData } from "lib/RouteHandler";
import { ConversationDownloadURLParams, ZodConversationDownloadURLParamsSchema } from "shared";

const router = Router();

// The response body here is unused, as this route responds with a file.
export class ConversationDownloadHandler extends RouteHandler<{ ok: true }> {
    /*
        #swagger.start
        #swagger.tags = ['Conversation', 'Files']
        #swagger.path = '/api/v1/conversation/{id}/download/{file}'
        #swagger.method = 'get'
        #swagger.description = 'Download a file from a conversation.'

        #swagger.parameters['id'] = {
            description: 'ID of the conversation containing the file',
            type: 'string'
        }

        #swagger.parameters['file'] = {
            description: 'The key of the file to download',
            type: 'string'
        }

        #swagger.responses[200] = {
            description: 'File download',
            $ref: '#/components/responses/ConversationDownloadResponse'
        }

        #swagger.responses[404] = {
            description: "Conversation or file not found",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/ErrorResponse"
                    },
                    example: {
                        ok: false,
                        code: "NOT_FOUND",
                        message: "No file found with the specified key in the conversation.",
                        help: "http://example.com/docs"
                    }
                }
            }
        }

        #swagger.responses[501] = {
            description: "Feature not implemented",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/ErrorResponse"
                    },
                    example: {
                        ok: false,
                        code: "NOT_IMPLEMENTED",
                        message: "This feature is not yet implemented.",
                        help: "http://example.com/docs"
                    }
                }
            }
        }
        #swagger.end
    */
    constructor() {
        super(1, "/#/Conversation/get_api_v1_conversation_download__id___file_");
    }

    async generateResponse(req: RouteHandlerRequestData) {
        const {
            success: paramsSuccess,
            data: params,
            error: paramsError
        } = ZodConversationDownloadURLParamsSchema.safeParse(req.params);

        if (!paramsSuccess) {
            return {
                response: this.buildZodErrorResponse(paramsError, "BAD_URL"),
                status: 400
            };
        }

        // Return not implemented for now
        return {
            response: this.buildNotImplementedResponse(),
            status: 501
        };
    }
}

router.get("/:id/download/:file", asyncErrorHandler(async (req, res) => {
    // #swagger.ignore = true
    const handler = new ConversationDownloadHandler();
    return await handler.handle(req, res);
}));

const conversationDownloadRouter = router;
export default conversationDownloadRouter;