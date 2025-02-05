import { asyncErrorHandler } from "@ptolemy2002/express-utils";
import { Router } from "express";
import RouteHandler from "lib/RouteHandler";
import ConversationModel from "models/ConversationModel";
import { ConversationListName200ResponseBody } from "shared";

const router = Router();

export class ConversationListNameHandler extends RouteHandler<ConversationListName200ResponseBody> {
    /*
        #swagger.start
        #swagger.path = '/api/v1/conversation/list-name'
        #swagger.method = 'get'
        #swagger.description = 'List all conversation names.'
        #swagger.responses[200] = {
            description: "Conversation names found",
            schema: {
                $ref: "#/components/schemas/ConversationListName200ResponseBody"
            }
        }
        #swagger.end
    */
    
    constructor() {
        super(1, "/#/Conversation/get_api_v1_conversation_list-name");
    }

    async generateResponse() {
        const docs = await ConversationModel.find({});

        return {
            status: 200,
            response: this.buildSuccessResponse({
                entries: docs.map((doc) => ({
                    _id: doc._id.toString(),
                    name: doc.name,
                    createdAt: doc.createdAt?.toISOString() ?? doc.messages.length > 0 ? doc.messages[0].date : new Date().toISOString(),
                    modifiedAt: doc.messages.length > 0 ? doc.messages[doc.messages.length - 1].date : doc.createdAt.toISOString()
                }))
            })
        };
    }
}
router.get('/list-name', asyncErrorHandler(async (req, res) => {
    // #swagger.ignore = true
    const handler = new ConversationListNameHandler();
    return await handler.handle(req, res);
}));

const conversationListNameRouter = router;
export default conversationListNameRouter;
