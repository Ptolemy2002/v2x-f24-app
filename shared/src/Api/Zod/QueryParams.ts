import { swaggerRegistry } from "src/Swagger";
import { ZodCoercedBoolean } from "src/Utilities";
import { z } from "zod";

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

export const ZodAltQueryParamSchema = swaggerRegistry.registerParameter(
    "alts",
    z.string()
        .transform(
            (v, ctx) => {
                let parsedValue;
                try {
                    parsedValue = JSON.parse(v);
                } catch (e) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: "Invalid JSON string"
                    });
                }

                if (!Array.isArray(parsedValue)) {
                    const received = typeof parsedValue;

                    ctx.addIssue({
                        code: z.ZodIssueCode.invalid_type,
                        expected: "array",
                        received
                    });
                }

                for (let i = 0; i < parsedValue.length; i++) {
                    const alt = parsedValue[i];
                    const received = typeof alt;

                    if (typeof alt !== "string") {
                        ctx.addIssue({
                            code: z.ZodIssueCode.invalid_type,
                            expected: "string",
                            received,
                            path: [i]
                        });
                    }
                }

                return parsedValue as string[];
            }
        )
        .optional()
        .openapi({
            description: "[Query Parameter] Alternative texts for the uploaded files. Use JSON array format, specifying an array of strings.",
            param: {
                name: "alts",
                in: "query"
            }
        })
);