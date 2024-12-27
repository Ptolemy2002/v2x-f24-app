import express from 'express';
import botRouter from './bot';
import conversationRouter from './conversation';
const router = express.Router();

router.use("/bot", botRouter
    /*
        #swagger.tags = ['Bot']
        
        #swagger.responses[400] = {
            description: "Bad request",
            schema: {
                $ref: "#/components/schemas/ErrorResponse400"
            }
        }

        #swagger.responses[500] = {
            description: "Internal server error",
            schema: {
                $ref: "#/components/schemas/ErrorResponse"
            }
        }

        #swagger.responses[501] = {
            description: "Not implemented",
            schema: {
                $ref: "#/components/schemas/ErrorResponse501"
            }
        }
    */
);

router.use("/conversation", conversationRouter
    /*
        #swagger.tags = ['Conversation']
        
        #swagger.responses[400] = {
            description: "Bad request",
            schema: {
                $ref: "#/components/schemas/ErrorResponse400"
            }
        }

        #swagger.responses[500] = {
            description: "Internal server error",
            schema: {
                $ref: "#/components/schemas/ErrorResponse"
            }
        }

        #swagger.responses[501] = {
            description: "Not implemented",
            schema: {
                $ref: "#/components/schemas/ErrorResponse501"
            }
        }
    */
);

const apiV1Router = router;
export default apiV1Router;