import { asyncErrorHandler } from "@ptolemy2002/express-utils";
import { Router } from "express";
import RouteHandler, { RouteHandlerRequestData } from "lib/RouteHandler";
import ConversationModel from "models/ConversationModel";
import { createMulter } from "services/multer";
import { ConversationUpload200ResponseBody, isAnonymousID, ZodConversationUploadFilesSchema, ZodConversationUploadURLParamsSchema } from "shared";

const router = Router();
const upload = createMulter();

export class ConversationUploadHandler extends RouteHandler<ConversationUpload200ResponseBody> {
    /*
        #swagger.start
        #swagger.tags = ['Conversation', 'Files']
        #swagger.path = '/api/v1/conversation/upload/{id}'
        #swagger.method = 'post'
        #swagger.description = 'Upload files to be used in a conversation.'

        #swagger.parameters['id'] = {
            description: 'ID of the conversation to upload files to.',
            type: 'string'
        }

        #swagger.requestBody = {
            required: true,
            content: {
                'multipart/form-data': {
                    schema: {
                        type: 'object',
                        properties: {
                            files: {
                                type: 'array',
                                items: {
                                    type: 'string',
                                    format: 'binary'
                                }
                            }
                        }
                    }
                }
            }
        }

        #swagger.responses[200] = {
            description: 'Files uploaded.',
            schema: {
                $ref: "#/components/schemas/ConversationUpload200ResponseBody"
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
        super(1, "/#/Conversation/post_api_v1_conversation_upload__id_");
    }

    async generateResponse(req: RouteHandlerRequestData) {
        const {
            success: paramsSuccess,
            data: params,
            error: paramsError
        } = ZodConversationUploadURLParamsSchema.safeParse(req.params);

        if (!paramsSuccess) {
            return {
                response: this.buildZodErrorResponse(paramsError, "BAD_URL"),
                status: 400
            };
        }

        const {
            success: filesSuccess,
            data: files,
            error: filesError
        } = ZodConversationUploadFilesSchema.safeParse(req.files);

        if (!filesSuccess) {
            return {
                response: this.buildZodErrorResponse(filesError, "BAD_BODY", { prefix: "files" }),
                status: 400
            };
        }

        const { id } = params;

        if (!isAnonymousID(id)) {
            const conversation = await ConversationModel.findById(id);

            if (conversation === null) {
                return {
                    status: 404,
                    response: this.buildNotFoundResponse("No conversation found with the specified ID.")
                };
            }

            console.log(files);

            return {
                status: 501,
                response: this.buildNotImplementedResponse()
            };
        } else {
            return {
                status: 501,
                response: this.buildNotImplementedResponse("Cannot upload files to an anonymous conversation yet.")
            };
        }
    }
}

router.post("/upload/:id", upload.array("files"), asyncErrorHandler(async (req, res) => {
    // #swagger.ignore = true
    const handler = new ConversationUploadHandler();
    return await handler.handle(req, res);
}));

const conversationUploadRouter = router;
export default conversationUploadRouter;