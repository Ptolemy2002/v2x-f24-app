import { swaggerRegistry } from "src/Swagger";
import { ZodCoercedBoolean } from "src/Utilities";

export const ZodAnonymousQueryParamSchema = swaggerRegistry.registerParameter(
    "anonymous",
    ZodCoercedBoolean
        .optional()
        .openapi({
            description: "[Query Parameter] When creating a conversation, this parameter determines whether it should be anonymous, meaning it will not be saved to the database.",
            default: "f",
            param: {
                name: "anonymous",
                in: "query"
            }
        })
);

export const ZodAnonymousShorthandQueryParamSchema = swaggerRegistry.registerParameter(
    "a",
    ZodAnonymousQueryParamSchema
        .openapi({
            description: "[Query Parameter] Shorthand for the `anonymous` query parameter.",
            param: {
                name: "a",
                in: "query"
            }
        })
);