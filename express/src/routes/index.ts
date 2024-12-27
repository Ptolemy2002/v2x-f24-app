import express from 'express';
import indexRoutes from './indexRoutes';
const router = express.Router();

router.use("/", indexRoutes
    /*
        This comment will automatically add all the specified properties to the routes
        defined in the indexRoutes file for documentation.

        #swagger.responses[500] = {
            description: "Internal server error",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/ErrorResponse"
                    },

                    example: {
                        ok: false,
                        code: "UNKNOWN",    
                        message: "An unknown error occurred.",
                        help: "http://example.com/docs"
                    }
                }
            }
        }

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
                        message: "The request was malformed.",
                        help: "http://example.com/docs"
                    }
                }
            }
        }
    */
);

const indexRouter = router;
export default indexRouter;