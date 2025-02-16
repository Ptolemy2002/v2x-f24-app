import express from 'express';
import indexRoutes from './indexRoutes';
import testFileRouter from './test-file';
const router = express.Router();

router.use("/", indexRoutes
    /*
        This comment will automatically add all the specified properties to the routes
        defined in the indexRoutes file for documentation.

        #swagger.responses[500] = {
            description: "Internal server error",
            schema: {
                $ref: "#/components/schemas/ErrorResponse"
            }
        }

        #swagger.responses[400] = {
            description: "Bad request",
            schema: {
                $ref: "#/components/schemas/ErrorResponse400"
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

router.use("/", testFileRouter);

const indexRouter = router;
export default indexRouter;