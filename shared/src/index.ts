import { OpenApiGeneratorV31 } from "@asteasolutions/zod-to-openapi";
import { swaggerRegistry } from "src/Swagger";

export * from "./Swagger";
export * from "./Utilities";
export * from "./Message";
export * from "./Api";

export const swaggerGenerator = new OpenApiGeneratorV31(swaggerRegistry.definitions);