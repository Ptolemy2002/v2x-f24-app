import express from 'express';
import botRouter from './bot';
import conversationRouter from './conversation';
const router = express.Router();

router.use("/bot", botRouter
    /*
        #swagger.tags = ['Bot']
        
        #swagger.responses[400] = {
            description: "Bad request",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/ErrorResponse"
                    },

                    example: {
                        ok: false,
                        code: "BAD_INPUT",
                        message: "Invalid input",
                        help: "https://example.com/docs"
                    }
                }
            }
        }

        #swagger.responses[500] = {
            description: "Internal server error",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/ErrorResponse"
                    }
                }
            }
        }

         #swagger.responses[501] = {
            description: "Not implemented",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/ErrorResponse"
                    },

                    example: {
                        ok: false,
                        code: "NOT_IMPLEMENTED",
                        message: "This feature is not implemented",
                        help: "https://example.com/docs"
                    }
                }
            }
        }
    */
);

router.use("/conversation", conversationRouter
    /*
        #swagger.tags = ['Conversation']
        
        #swagger.responses[400] = {
            description: "Bad request",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/ErrorResponse"
                    },

                    example: {
                        ok: false,
                        code: "BAD_INPUT",
                        message: "Invalid input",
                        help: "https://example.com/docs"
                    }
                }
            }
        }

        #swagger.responses[500] = {
            description: "Internal server error",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/ErrorResponse"
                    }
                }
            }
        }

        #swagger.responses[501] = {
            description: "Not implemented",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/ErrorResponse"
                    },

                    example: {
                        ok: false,
                        code: "NOT_IMPLEMENTED",
                        message: "This feature is not implemented",
                        help: "https://example.com/docs"
                    }
                }
            }
        }
    */
);

const apiV1Router = router;
export default apiV1Router;