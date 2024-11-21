import axios, { AxiosInstance } from "axios";
import getEnv from "src/Env";

export let Api: AxiosInstance | null = null;

export default function getApi(): AxiosInstance {
    if (Api) {
        return Api;
    }

    const env = getEnv();
    Api = axios.create({
        baseURL: env.isProd ? env.prodApiUrl! : env.devApiUrl,
        withCredentials: true
    });

    return Api;
}