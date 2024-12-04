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
                $ref: "#/definitions/ErrorResponse"
            },

            examples: {
                "application/json": {
                    ok: false,
                    code: "BAD_INPUT",
                    message: "Invalid input"
                }
            }
        }

        #swagger.responses[500] = {
            description: "Internal server error",
            schema: {
                $ref: "#/definitions/ErrorResponse"
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
                $ref: "#/definitions/ErrorResponse"
            },

            examples: {
                "application/json": {
                    ok: false,
                    code: "BAD_INPUT",
                    message: "Invalid input"
                }
            }
        }

        #swagger.responses[500] = {
            description: "Internal server error",
            schema: {
                $ref: "#/definitions/ErrorResponse"
            }
        }
    */
);

const apiV1Router = router;
export default apiV1Router;