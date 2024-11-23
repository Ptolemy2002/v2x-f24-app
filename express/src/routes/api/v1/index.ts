import express from 'express';
import botRouter from './bot';
const router = express.Router();

router.use("/bot", botRouter
    /*
        #swagger.tags = ['Bot']
        
        #swagger.responses[400] = {
            description: "Bad request",
            schema: {
                $ref: "#/definitions/ErrorResponse"
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