import express from 'express';
import botRouter from './bot';
const router = express.Router();

router.use("/bot", botRouter
    /*
        #swagger.tags = ['Bot']
        
        #swagger.responses[400] = {
            description: "Bad request",
            schema: {
                ok: false,
                message: "Bad request"
            }
        }
    */
);

const apiV1Router = router;
export default apiV1Router;