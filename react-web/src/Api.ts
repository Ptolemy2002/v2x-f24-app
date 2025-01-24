import { BotQueryRequestBody, BotQueryResponseBody, ConversationGetResponseBody, ConversationGetURLParams } from "shared";
import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";
import { TypedAxios, RouteDef } from "typed-axios-instance";
import getEnv from "src/Env";
import { setupCache, CacheOptions } from "axios-cache-interceptor";
import { minutesToMilliseconds } from "date-fns";

export let Api: AxiosInstance | null = null;

// This is just a wrapper to ensure that ApiRoutes is an array of RouteDefs.
// TypeScript will error if it is not.
type RouteDefArray<T extends RouteDef[]> = T;
export type ApiRoutes = RouteDefArray<[
    {
        route: "/bot/query",
        method: "POST",

        jsonBody: BotQueryRequestBody,
        jsonResponse: BotQueryResponseBody
    },

    {
        route: `/conversation/get/${ConversationGetURLParams["id"]}`,
        method: "GET",

        jsonResponse: ConversationGetResponseBody
    }
]>;

export default function getApi(
    options: CreateAxiosDefaults={},
    cacheOptions: CacheOptions={
        ttl: minutesToMilliseconds(5)
    },
    createNew=false
): TypedAxios<ApiRoutes> {
    if (!createNew && Api) {
        return Api;
    }

    const env = getEnv();
    Api = setupCache(axios.create({
        withCredentials: true,
        ...options,
        baseURL: env.isProd ? env.prodApiUrl! : env.devApiUrl
    }), cacheOptions);

    return Api;
}