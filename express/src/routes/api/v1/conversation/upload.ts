import { asyncErrorHandler } from "@ptolemy2002/express-utils";
import { Router } from "express";
import RouteHandler, { RouteHandlerRequestData } from "lib/RouteHandler";
import ConversationModel from "models/ConversationModel";
import multer from "multer";
import { cleanTempUploads, createMulter } from "services/multer";
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
            data: _files,
            error: filesError
        } = ZodConversationUploadFilesSchema.safeParse(req.files);

        if (!filesSuccess) {
            return {
                response: this.buildZodErrorResponse(filesError, "BAD_BODY", { prefix: "files" }),
                status: 400
            };
        }

        // Since Zod passes through unknown fields, this is safe to do.
        const files = _files as (typeof _files) & Express.Multer.File[];

        const { id } = params;
        const anonymous = isAnonymousID(id);

        const conversation = await ConversationModel.findById(id);
        if (!conversation && !anonymous) {
            return {
                response: this.buildErrorResponse("NOT_FOUND", "No conversation found with the specified ID."),
                status: 404
            };
        }

        const newFiles = [];

        for (const file of files) {
            console.log(`Uploading file ${file.originalname} to conversation ${id}...`);
            const {newFile} = await ConversationModel.addFile(
                id,
                file.path,
                file.type.split("/")[0] === "image" ? "image" : "audio",
                `$target/conversation/download/${id}/$key`,
                {
                    existingConversation: conversation,
                }
            );
            console.log(`Successfully uploaded as ${id}/${newFile.key}.`);

            console.log(`Removing temp file ${file.filename}...`);
            cleanTempUploads([file.filename]);
            console.log(`Successfully removed temp file ${file.filename}.`);

            newFiles.push(newFile);
        }

        if (conversation) {
            await conversation.save();
        }

        return {
            response: this.buildSuccessResponse({
                uploaded: true,
                newFiles
            }),
            status: 200
        };
    }
}

router.post("/upload/:id", upload.array("files"), asyncErrorHandler(async (req, res) => {
    // #swagger.ignore = true
    const handler = new ConversationUploadHandler();
    return await handler.handle(req, res);
}));

const conversationUploadRouter = router;
export default conversationUploadRouter;