import axios, { AxiosInstance } from "axios";
import getEnv from "src/Env";

export const Api: AxiosInstance | null = null;

export default function getApi(): AxiosInstance {
    if (Api) {
        return Api;
    }

    const env = getEnv();
    const api = axios.create({
        baseURL: env.isProd ? env.prodApiUrl! : env.devApiUrl,
        withCredentials: true
    });

    return api;
}