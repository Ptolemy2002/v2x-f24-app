import RouteHandler, { RouteHandlerRequestData } from "lib/RouteHandler";
import { Router } from "express";
import ConversationModel from "models/ConversationModel";
import { ConversationNew200ResponseBody, createMongoTextMessage, MongoConversation, ZodConversationNewQueryParamsSchema } from "shared";
import { asyncErrorHandler } from "@ptolemy2002/express-utils";
import { nanoid } from "nanoid";

const router = Router();

const defaultFiles = {
    "placeholder-image": {
        key: "placeholder-image",
        type: "image",
        url: "/placeholder-image.png",
        alt: "placeholder image"
    },
    "placeholder-audio": {
        key: "placeholder-audio",
        type: "audio",
        url: "/aud-test.wav",
        alt: "placeholder audio"
    }
} as const;

class ConversationNewHandler extends RouteHandler<ConversationNew200ResponseBody> {
    /*
        #swagger.start
        #swagger.path = '/api/v1/conversation/new'
        #swagger.method = 'post'
        #swagger.description = 'Create a new conversation with the default demo data.'

        #swagger.parameters['$ref'] = [
            "#/components/parameters/anonymous",
            "#/components/parameters/a"
        ]
        
        #swagger.responses[200] = {
            description: "Conversation created",
            schema: {
                $ref: "#/components/schemas/ConversationNew200ResponseBody"
            }
        }
        #swagger.end
    */
    constructor() {
        super(1, "/#/Conversation/new_api_v1_conversation_new_");
    }

    async generateResponse(req: RouteHandlerRequestData) {
        const {
            success: paramsSuccess,
            data: paramsData,
            error: paramsError
        } = ZodConversationNewQueryParamsSchema.safeParse(req.query);

        if (!paramsSuccess) {
            return {
                status: 400,
                response: this.buildZodErrorResponse(
                    paramsError,
                    "BAD_QUERY"
                )
            }
        }

        const { anonymous } = paramsData;

        const defaultMessages = [
            createMongoTextMessage(
                "recepient",
                () => ({
                    text: "Hello! How can I assist you today?"
                })
            )
        ];

        if (!anonymous) {
            const conversation = await ConversationModel.createWithUniqueName("Untitled Conversation", {
                messages: defaultMessages,
                files: defaultFiles
            });

            return {
                status: 200,
                response: this.buildSuccessResponse({
                    conversation: conversation.toClientJSON()
                })
            }
        } else {
            // Create a new conversation, but don't save it to the database
            const conversation: MongoConversation = {
                _id: "anonymous-" + nanoid(),
                name: "Anonymous Conversation",
                messages: defaultMessages,
                createdAt: new Date().toISOString(),
                files: defaultFiles
            };

            return {
                status: 200,
                response: this.buildSuccessResponse({
                    conversation
                })
            }
        }
    }
}

router.post("/new", asyncErrorHandler(async (req, res) => {
    // #swagger.ignore = true
    const handler = new ConversationNewHandler();
    await handler.handle(req, res);
}));

const conversationNewRouter = router;
export default conversationNewRouter;