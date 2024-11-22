import useSearchParamState, { ConvertFunctions, SetSearchParamAction } from "@ptolemy2002/react-search-param-state";
import { useCallback } from "react";

export type SearchParams = {
    convo: string | null;
};

export type UseAppSearchParamResult = Readonly<SearchParams & {
    // Dynamically generate a setter for each property in SearchParams
    [K in `set${Capitalize<string & keyof SearchParams>}`]: (value: SetSearchParamAction<
        SearchParams,
        K extends `set${infer R}` ? Lowercase<R> : never
    >) => void;
}>;

export const converts: ConvertFunctions<SearchParams> = {
    convo: (v) => v === "null" ? null : v
};

export const defaultValues: Partial<SearchParams> = {
    convo: null
};

export default function useAppSearchParamState(): UseAppSearchParamResult {
    const [{convo}, setSearchParams] = useSearchParamState(defaultValues, converts);

    const setConvo = useCallback<UseAppSearchParamResult["setConvo"]>(
        (value) => setSearchParams({convo: value}),
        [setSearchParams]
    );

    return {
        convo,
        setConvo
    };
}