import swaggerAutogen from "swagger-autogen";
import getEnv from "../env";
import {
  SwaggerErrorCodeSchema,
  SwaggerErrorResponseSchema,
  SwaggerMessageOriginSchema,
  SwaggerMessageTypeSchema,
  SwaggerMongoConversationSchema,
  SwaggerMongoMessageSchema,
} from "shared";
const env = getEnv();

const outputFile = "./swagger_output.json";
const endpointFiles = ["src/routes/index.ts"];

const url = ((env.isProd && env.prodApiUrl) || env.devApiUrl)
  .split("://")
  .slice(1)
  .join("://");
const baseUrl = url.endsWith("/api/v1") ? url.slice(0, -7) : url;

const doc = {
  info: {
    version: "1.0.0",
    title: "V2X F24 API",
    description: "Documentation of the V2X F24 API",
  },
  host: baseUrl,
  schemes: [process.env.NODE_ENV === "production" ? "https" : "http"],
  consumes: ["application/json"],
  produces: ["application/json"],

  components: {
    schemas: {
      MessageType: SwaggerMessageTypeSchema,
      MessageOrigin: SwaggerMessageOriginSchema,
      ErrorCode: SwaggerErrorCodeSchema,

      BotQueryRequestBody: {
        conversation: { $ref: "#/components/schemas/MongoConversation" },
      },
    },

    "@schemas": {
      MongoMessage: SwaggerMongoMessageSchema,
      MongoConversation: SwaggerMongoConversationSchema,
      ErrorResponse: SwaggerErrorResponseSchema,
    },
  },
};

export default swaggerAutogen({ openapi: "3.1.1" })(
  outputFile,
  endpointFiles,
  doc
);
