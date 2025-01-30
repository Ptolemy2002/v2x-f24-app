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
        const ids = await ConversationModel.distinct("_id");
        const names = await ConversationModel.distinct("name");

        return {
            status: 200,
            response: this.buildSuccessResponse({
                entries: ids.map((id, i) => ({
                    _id: id.toString(),
                    name: names[i]
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
