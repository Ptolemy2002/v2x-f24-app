import { ComponentProps, createContext, useCallback, useContext, useState } from "react";
import { MaybeTransformer } from "@ptolemy2002/ts-utils";
import { ThemeProvider, useTheme } from "styled-components";
import isCallable from "is-callable";
import { DefaultTheme } from "styled-components/dist/types";

export type ThemeProviderProps = ComponentProps<typeof ThemeProvider>;

export type NamedTheme = {
    id: string,
    displayName: string;
    value: ThemeProviderProps["theme"];
};

export const NamedThemes: NamedTheme[] = [
    {
        id: "dark",
        displayName: "Dark",
        value: {
            backgroundColor: "#343541",
            headerBackgroundColor: "#202123",

            textColor: "white",
            activeTextColor: "#19c37d",

            senderColor: "#19c37d",
            recepientColor: "#40414F",
            timestampColor: "#bbb",
            
            inputColor: "#555",

            audioPlayerProgressColor: "#888",
            audioPlayerBackgroundColor: "#343541",
            
            dangerIconColor: "white",
            dangerIconBackgroundColor: "red",
            
            borderThickness: "1px",
            borderColor: "white",
            borderStyle: "solid"
        }
    }
];

export type SetNamedThemeCallback = (theme: MaybeTransformer<string | number, [string]>) => void;
const NamedThemeSetterContext = createContext<SetNamedThemeCallback | undefined>(undefined);

export function findThemeByValue(value: DefaultTheme) {
    return NamedThemes.find((theme) => theme.value === value) ?? null;
}

export function findThemeById(id: string) {
    return NamedThemes.find((theme) => theme.id === id) ?? null;
}

export function verifyTheme(theme: string | number) {
    if (typeof theme === "number") {
        if (!NamedThemes[theme]) {
            throw new Error(`Theme with index ${theme} not found`);
        }
        return NamedThemes[theme].id;
    } else if (!findThemeById(theme)) {
        throw new Error(`Theme ${theme} not found`);
    }

    return theme;
}

export type NamedThemeProviderProps = Omit<ThemeProviderProps, "theme"> & {initial: string | number};
export function NamedThemeProvider({initial=0, ...props}: NamedThemeProviderProps) {
    const [currentTheme, _setCurrentTheme] = useState<string>(() => verifyTheme(initial));

    const setCurrentTheme = useCallback<SetNamedThemeCallback>((theme) => {
        _setCurrentTheme((prev) => {
            const next = isCallable(theme) ? theme(prev) : theme;
            return verifyTheme(next);
        });
    }, [_setCurrentTheme]);

    return (
        <NamedThemeSetterContext.Provider value={setCurrentTheme}>
            <ThemeProvider theme={findThemeById(currentTheme)!.value} {...props} />
        </NamedThemeSetterContext.Provider>
    );
}

export function useNamedTheme() {
    const theme = useTheme();
    const setTheme = useContext(NamedThemeSetterContext);

    if (setTheme === undefined) {
        throw new Error("useNamedTheme must be used within a NamedThemeProvider");
    }

    return [findThemeByValue(theme)!, setTheme] as const;
}