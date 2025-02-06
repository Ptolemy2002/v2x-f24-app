import { Router } from "express";
import RouteHandler, { RouteHandlerRequest } from "lib/RouteHandler";
import ConversationModel from "models/ConversationModel";
import { ConversationUpdateByName200ResponseBody, ZodConversationUpdateByNameRequestBodySchema, ZodConversationUpdateByNameURLParamsSchema } from "shared";
import { Error } from "mongoose";
import { asyncErrorHandler } from "@ptolemy2002/express-utils";
import RouteError from "lib/RouteError";
import { MongoServerError } from "mongodb";

const router = Router();

export class UpdateConversationByNameHandler extends RouteHandler<ConversationUpdateByName200ResponseBody> {
    /*
        #swagger.start
        #swagger.path = '/api/v1/conversation/update/by-name/{name}'
        #swagger.method = 'post'
        #swagger.description = 'Update an existing conversation in the database.'

        #swagger.requestBody = {
            required: true,
            schema: {
                $ref: "#/components/schemas/ConversationUpdateByNameRequestBody"
            }
        }

        #swagger.parameters['name'] = {
            in: 'path',
            required: true,
            type: 'string',
            description: 'The name of the conversation to update.'
        }

        #swagger.responses[200] = {
            schema: {
                $ref: "#/components/schemas/ConversationUpdateByNameResponseBody"
            }
        }
        #swagger.end
    */
    constructor() {
        super(1, "/#/Conversation/post_api_v1_conversation_update_by_name__name_");
    }

    async generateResponse(req: RouteHandlerRequest) {
        const {
            success: bodySuccess,
            error: bodyError,
            data: body
        } = ZodConversationUpdateByNameRequestBodySchema.safeParse(req.body);

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
        } = ZodConversationUpdateByNameURLParamsSchema.safeParse(req.params);

        if (!paramsSuccess) {
            return {
                status: 400,
                response: this.buildZodErrorResponse(paramsError, "BAD_URL")
            };
        }

        const { name } = params;

        const oldConversation = await ConversationModel.findOne({ name });
        if (oldConversation === null) {
            return {
                status: 404,
                response: this.buildNotFoundResponse("Conversation not found")
            };
        }
        const oldConversationJSON = oldConversation.toClientJSON();

        let newConversation;

        try {
            newConversation = (await ConversationModel.findOneAndUpdate({ name }, body.difference, { new: true }))!;
        } catch (e) {
            if (e instanceof MongoServerError) {
                if (e.codeName === "DuplicateKey") {
                    throw new RouteError(
                        "Name conflict",
                        409,
                        "VALIDATION",
                        this.help
                    );
                }
            }

            throw e;
        }
        
        newConversation.removeUnsetFields();

        // Re-validate the conversation
        try {
            await newConversation.validate();
        } catch (_e) {
            // Find and replace with the original conversation
            await ConversationModel.findOneAndReplace({ name }, oldConversationJSON);

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

router.post("/update/by-name/:name", asyncErrorHandler(async (req, res) => {
    // #swagger.ignore = true
    const handler = new UpdateConversationByNameHandler();
    return await handler.handle(req, res);
}));

const conversationUpdateByNameRouter = router;
export default conversationUpdateByNameRouter;