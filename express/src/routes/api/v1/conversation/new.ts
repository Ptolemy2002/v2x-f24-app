import RouteHandler, { RouteHandlerRequest } from "lib/RouteHandler";
import { Router } from "express";
import ConversationModel from "models/ConversationModel";
import { ConversationNew200ResponseBody, createMongoTextMessage } from "shared";
import { asyncErrorHandler } from "@ptolemy2002/express-utils";

const router = Router();

class ConversationNewHandler extends RouteHandler<ConversationNew200ResponseBody> {
    /*
        #swagger.start
        #swagger.path = '/api/v1/conversation/new'
        #swagger.method = 'post'
        #swagger.description = 'Create a new conversation with the default demo data.'
        
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

    async generateResponse(req: RouteHandlerRequest) {
        const conversation = await ConversationModel.create({
            name: "Untitled Conversation",
            messages: [
                createMongoTextMessage(
                    "recepient",
                    () => ({
                        text: "Hello! How can I assist you today?"
                    })
                )
            ]
        });
        await conversation.makeNameUnique();

        return {
            status: 200,
            response: this.buildSuccessResponse({
                conversation: conversation.toClientJSON()
            })
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