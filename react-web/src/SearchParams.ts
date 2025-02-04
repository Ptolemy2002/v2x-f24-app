import useSearchParamState, { ConvertFunctions, SetSearchParamFunction } from "@ptolemy2002/react-search-param-state";
import { useCallback } from "react";

export type SearchParams = {
    convo: string | null;
};

export type UseAppSearchParamResult = Readonly<SearchParams & {
    // Dynamically generate a setter for each property in SearchParams
    [K in `set${Capitalize<string & keyof SearchParams>}`]: SetSearchParamFunction<SearchParams>;
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
        (value, options) => setSearchParams({convo: value}, options),
        [setSearchParams]
    );

    return {
        convo,
        setConvo
    };
}