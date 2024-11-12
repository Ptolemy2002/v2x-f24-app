import swaggerAutogen from "swagger-autogen";

const outputFile = './swagger_output.json';
const endpointFiles = ['src/routes/index.ts'];

const url = (
    (process.env.NODE_ENV === 'production' && process.env.PROD_BACKEND_URL)
    || (process.env.DEV_BACKEND_URL ?? 'http://localhost:8080')
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

	definitions: {
		User: {
			id: 1,
		},
	}
};

export default swaggerAutogen()(outputFile, endpointFiles, doc);