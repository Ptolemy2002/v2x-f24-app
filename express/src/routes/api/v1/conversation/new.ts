import RouteHandler from "lib/RouteHandler";
import { ConversationNew200ResponseBody } from "shared";

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
}