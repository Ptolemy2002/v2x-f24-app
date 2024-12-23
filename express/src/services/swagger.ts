import swaggerAutogen from "swagger-autogen";
import getEnv from "../env";
import { text } from "stream/consumers";
const env = getEnv();

const outputFile = './swagger_output.json';
const endpointFiles = ['src/routes/index.ts'];

const url = (
    (env.isProd && env.prodApiUrl) || env.devApiUrl
).split('://').slice(1).join('://');
const baseUrl = url.endsWith('/api/v1') ? url.slice(0, -7) : url;

const doc = {
	info: {
		version: "1.0.0",
		title: "V2X F24 API",
		description: "Documentation of the V2X F24 API",
	},
    host: baseUrl,
	schemes: [process.env.NODE_ENV === 'production' ? "https" : "http"],
	consumes: ["application/json"],
	produces: ["application/json"],

	components: {
		schemas: {
			MessageType: {
				"@enum": ["text", "image", "audio"]
			},

			MessageOrigin: {
				"@enum": ["recepient", "bot"]
			},

			MongoMessage: {
				$id: "abc123",
				$type: { $ref: "#/components/schemas/MessageType" },
				$origin: { $ref: "#/components/schemas/MessageOrigin" },
				$date: "2021-06-01T00:00:00.000Z",
				text: "Hello, World!",
				src: "https://example.com/image.jpg",
				alt: "Image description"
			},

			ErrorCode: {
				"@enum": [
					"UNKNOWN",
					"BAD_INPUT",
					"INTERNAL",
					"NOT_FOUND",
					"NOT_IMPLEMENTED"
				]
			},

			ErrorResponse: {
				$ok: false,
				$code: { $ref: "#/components/schemas/ErrorCode" },
				$message: "Something went wrong",
				help: "https://example.com/docs"
			},

			MongoConversation: {
				$_id: "abc123",
				messages: [
					{ $ref: "#/components/schemas/MongoMessage" }
				]
			}
		}
	}
};

export default swaggerAutogen({openapi: "3.0.0"})(outputFile, endpointFiles, doc);