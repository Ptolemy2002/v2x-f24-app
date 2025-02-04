import { Router } from "express";
import RouteHandler, { RouteHandlerRequest } from "lib/RouteHandler";
import ConversationModel from "models/ConversationModel";
import { ConversationUpdateByID200ResponseBody, ZodConversationUpdateByIDRequestBodySchema, ZodConversationUpdateByIDURLParamsSchema } from "shared";
import { Error } from "mongoose";
import { asyncErrorHandler } from "@ptolemy2002/express-utils";

const router = Router();

export class UpdateConversationByIDHandler extends RouteHandler<ConversationUpdateByID200ResponseBody> {
    /*
        #swagger.start
        #swagger.path = '/api/v1/conversation/update/by-id/{id}'
        #swagger.method = 'post'
        #swagger.description = 'Update an existing conversation in the database.'

        #swagger.requestBody = {
            required: true,
            schema: {
                $ref: "#/components/schemas/ConversationUpdateByIDRequestBody"
            }
        }

        #swagger.parameters['id'] = {
            in: 'path',
            required: true,
            type: 'string',
            description: 'The ID of the conversation to update.'
        }

        #swagger.responses[200] = {
            schema: {
                $ref: "#/components/schemas/ConversationUpdateByIDResponseBody"
            }
        }
        #swagger.end
    */
    constructor() {
        super(1, "/#/Conversation/post_api_v1_conversation_update_by_id__id_");
    }

    async generateResponse(req: RouteHandlerRequest) {
        const {
            success: bodySuccess,
            error: bodyError,
            data: body
        } = ZodConversationUpdateByIDRequestBodySchema.safeParse(req.body);

        if (!bodySuccess) {
            return {
                status: 400,
                response: this.buildZodErrorResponse(bodyError, "BAD_BODY")
            };
        }

        const {
            success: paramsSuccess,
            error: paramsError,
            data: params
        } = ZodConversationUpdateByIDURLParamsSchema.safeParse(req.params);

        if (!paramsSuccess) {
            return {
                status: 400,
                response: this.buildZodErrorResponse(paramsError, "BAD_URL")
            };
        }

        const { id } = params;

        const oldConversation = await ConversationModel.findOne({ _id: id });
        if (oldConversation === null) {
            return {
                status: 404,
                response: this.buildNotFoundResponse("Conversation not found")
            };
        }
        const oldConversationJSON = oldConversation.toClientJSON();

        const newConversation = (await ConversationModel.findOneAndUpdate({ _id: id }, body.difference, { new: true }))!;
        newConversation.removeUnsetFields();

        // Re-validate the conversation
        try {
            await newConversation.validate();
        } catch (_e) {
            // Find and replace with the original conversation
            await ConversationModel.findOneAndReplace({ _id: id }, oldConversationJSON);

            const e = _e as Error.ValidationError;

            return {
                status: 500,
                response: this.buildErrorResponse("VALIDATION", e.message)
            };
        }

        return {
            status: 200,
            response: this.buildSuccessResponse({
                conversation: newConversation.toClientJSON()
            })
        };
    }
}

router.post("/update/by-id/:id", asyncErrorHandler(async (req, res) => {
    // #swagger.ignore = true
    const handler = new UpdateConversationByIDHandler();
    return await handler.handle(req, res);
}));

const conversationUpdateByIDRouter = router;
export default conversationUpdateByIDRouter;