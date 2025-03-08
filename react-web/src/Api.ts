import { BotQueryRequestBody, BotQueryResponseBody, ConversationGetResponseBody, ConversationGetURLParams, ConversationListNameResponseBody, ConversationNewQueryParamsInput, ConversationNewResponseBody, ConversationUpdateRequestBodyInput, ConversationUpdateResponseBody, ConversationUpdateURLParams } from "shared";
import axios, { CreateAxiosDefaults } from "axios";
import { TypedAxios, RouteDef } from "typed-axios-instance";
import getEnv from "src/Env";
import { setupCache, CacheOptions, AxiosCacheInstance } from "axios-cache-interceptor";
import { minutesToMilliseconds } from "date-fns";
import { Override } from "@ptolemy2002/ts-utils";

export let Api: AxiosCacheInstance | null = null;

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
    },

    {
        route: "/conversation/list-name",
        method: "GET",

        jsonResponse: ConversationListNameResponseBody
    },

    {
        route: `/conversation/update/${ConversationUpdateURLParams["id"]}`,
        method: "POST",

        jsonBody: ConversationUpdateRequestBodyInput,
        jsonResponse: ConversationUpdateResponseBody
    },

    {
        route: "/conversation/new",
        method: "POST",

        jsonResponse: ConversationNewResponseBody,
        queryParams: ConversationNewQueryParamsInput
    }
]>;

export const RouteIds = {
    botQuery: "/bot/query",
    conversationGet: `/conversation/get/:id`,
    conversationListName: "/conversation/list-name",
    conversationUpdate: `/conversation/update/:id`,
    conversationNew: "/conversation/new"
} as const;

export default function getApi(
    options: Omit<CreateAxiosDefaults, "baseURL">={},
    cacheOptions: CacheOptions={
        ttl: minutesToMilliseconds(5)
    },
    createNew=false
): Override<AxiosCacheInstance, TypedAxios<ApiRoutes>> {
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