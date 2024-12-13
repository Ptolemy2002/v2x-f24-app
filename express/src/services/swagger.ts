import swaggerAutogen from "swagger-autogen";
import getEnv from "../env";
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

	"@definitions": {
		MongoMessage: {
			type: "object",
			properties: {
				id: {
					type: "string"
				},
				type: {
					type: "string",
					enum: ["text", "image", "audio"]
				},

				origin: {
					type: "string",
					enum: ["recepient", "bot"]
				},

				date: {
					type: "string"
				},

				text: {
					type: "string",
					required: false
				},

				src: {
					type: "string",
					required: false
				},

				alt: {
					type: "string",
					required: false
				}
			}
		},

		ErrorCode: {
			type: "string",
			enum: [
				"UNKNOWN",
				"BAD_INPUT",
				"INTERNAL",
				"NOT_FOUND",
				"NOT_IMPLEMENTED"
			]
		},

		ErrorResponse: {
			type: "object",
			properties: {
				ok: {
					type: "boolean",
					enum: [false]
				},
				// Code is either an error code or null
				code: {
					$ref: "#/definitions/ErrorCode"
				},
				message: {
					type: "string"
				},
				help: {
					type: "string",
					required: false,
					description: "URL to the documentation"
				}
			}
		},

		MongoConversation: {
			type: "object",
			properties: {
				_id: {
					type: "string"
				},
				messages: {
					type: "array",
					items: {
						$ref: "#/definitions/MongoMessage"
					}
				}
			}
		}
	}
};

export default swaggerAutogen()(outputFile, endpointFiles, doc);