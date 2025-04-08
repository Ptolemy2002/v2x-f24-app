# V2X F24 App
This repository contains all elements of the V2X F24 app except the LLM implementation presently. Specifically:
1. A React 18 frontend app in the `react-web` folder.
2. An ExpressJS backend app in the `express` folder.
3. A Typescript program including shared resources that are used by both the frontend and backend in the `shared` folder.
4. An example Python API implementation in the `py-example` folder.

## Installation
1. Assuming a fresh npm installation, run `npm install -g typesync patch-package` to install a couple of utilities that are used in this project.
2. Run `npm install` in the `shared` folder to install the dependencies for that project.
3. Run `npm run build` in the `shared` folder to build the shared resources.
4. Run `npm install` in the `express` and `react-web` folders to install the dependencies for those projects.
5. Within the `py-example` folder, run `uv install` to install the dependencies for that project.
    * The `make start` command within the `py-example` folder will start the Python API server.
6. To fully run the application, open the `express` and `react-web` folders in separate terminals and run `npm run dev` in both so they are running simultaneously. They should be able to communicate with each other if the environment variables are set correctly.

## Environment Variables
### Express
- `PORT`: The port on which the Express server will run. Default is `8080`.
- `DEV_API_URL`: The URL of this server. Default is `http://localhost:8080`.
- `PROD_API_URL`: The URL of this server in production. No default value, so an error will be thrown if it is unspecified when the app is run in production mode.
- `DEV_CLIENT_URL`: The URL of the React app. Default is `http://localhost:5000`.
- `PROD_CLIENT_URL`: The URL of the React app in production. No default value, so an error will be thrown if it is unspecified when the app is run in production mode.
- `MONGO_CONNECTION_STRING` (required): The connection string for the MongDB database. It should be in the format `mongodb+srv://admin:<password>@cluster0.zzwdw.mongodb.net/v2x-f24`
- `GCLOUD_CONVERSATION_BUCKET` (required): The name of the Google cloud storage bucet that will be used to store file uploads. Usually this should be `v2x-datamine-gcloud-conversation-files`.

### React
- `VITE_DEV_API_URL`: The URL of the root API route of the express server. Default is `http://localhost:8080/api/v1`.
- `VITE_PROD_API_URL`: The URL of the Express server in production. No default value, so an error will be thrown if it is unspecified when the app is run in production mode.
- `VITE_DEV_CLIENT_URL`: The URL of the React app. Default is `http://localhost:5000`.
- `VITE_PROD_CLIENT_URL`: The URL of the React app in production. No default value, so an error will be thrown if it is unspecified when the app is run in production mode.
- `VITE_DEBUG`: If set to `true`, the app will run in debug mode, which currently only enables the `react-scan` library, used to help visualize and resolve performance issues in the app. Default is `false`.
