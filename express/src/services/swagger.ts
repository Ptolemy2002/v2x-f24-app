import swaggerAutogen from "swagger-autogen";
import getEnv from "../env";
import { stripWords } from '@ptolemy2002/js-utils';
import {
  swaggerGenerator,
  acceptedFileTypes,
} from "shared";
const env = getEnv();

const outputFile = "./swagger_output.json";
const endpointFiles = ["src/routes/index.ts"];

const baseUrl = stripWords(
  env.apiURL,
  '/',
  /^https?:\/\//.test(env.apiURL) ? 2 : 0,
  /\/api\/v\d+$/.test(env.apiURL) ? 2 : 0,
);
console.log('Detected Swagger Base URL:', baseUrl);

const generatedComponents = swaggerGenerator.generateComponents().components ?? {};
const generatedSchemas = generatedComponents.schemas ?? {};
const genetatedParameters = generatedComponents.parameters ?? {};

const doc = {
  info: {
    version: "1.0.0",
    title: "V2X F24 API",
    description: "Documentation of the V2X F24 API",
  },
  host: baseUrl,
  schemes: [process.env.NODE_ENV === "production" ? "https" : "http"],
  consumes: ["application/json", "multipart/form-data"],
  produces: ["application/json", ...acceptedFileTypes],

  components: {
      parameters: genetatedParameters,
      "@schemas": generatedSchemas
  }
};

export default swaggerAutogen({ openapi: "3.1.1" })(
  outputFile,
  endpointFiles,
  doc
);
