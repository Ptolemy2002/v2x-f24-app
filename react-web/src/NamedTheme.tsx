import { ComponentProps, createContext, useCallback, useContext, useState } from "react";
import { MaybeTransformer } from "@ptolemy2002/ts-utils";
import { ThemeProvider, useTheme } from "styled-components";
import isCallable from "is-callable";

export type ThemeProviderProps = ComponentProps<typeof ThemeProvider>;

export const NamedThemes: Record<string, ThemeProviderProps["theme"]> = {
    dark: {
        backgroundColor: "#343541",
        headerBackgroundColor: "#202123",
        textColor: "white",
        activeTextColor: "#19c37d",
        senderColor: "#19c37d",
        senderTextColor: "white",
        recepientColor: "#40414F",
        timestampColor: "#bbb",
        inputColor: "#555",
        inputTextColor: "white",
        recepientTextColor: "white",
        audioPlayerProgressColor: "#888",
        audioPlayerBackgroundColor: "#343541",
        dangerIconColor: "white",
        dangerIconBackgroundColor: "red",
        borderThickness: "1px",
        borderColor: "white",
        borderStyle: "solid"
    }
};

export type SetNamedThemeCallback = (theme: MaybeTransformer<string, [string]>) => void;
const NamedThemeSetterContext = createContext<SetNamedThemeCallback | undefined>(undefined);

export function verifyTheme(theme: string) {
    if (!NamedThemes[theme]) {
        throw new Error(`Theme ${theme} not found`);
    }
}

export type NamedThemeProviderProps = Omit<ThemeProviderProps, "theme"> & {initial: string};
export function NamedThemeProvider({initial, ...props}: NamedThemeProviderProps) {
    const [currentTheme, _setCurrentTheme] = useState<string>(() => {
        verifyTheme(initial);
        return initial;
    });

    const setCurrentTheme = useCallback<SetNamedThemeCallback>((theme) => {
        _setCurrentTheme((prev) => {
            const next = isCallable(theme) ? theme(prev) : theme;
            verifyTheme(next);
            return next;
        });
    }, [_setCurrentTheme]);

    return (
        <NamedThemeSetterContext.Provider value={setCurrentTheme}>
            <ThemeProvider theme={NamedThemes[currentTheme]} {...props} />
        </NamedThemeSetterContext.Provider>
    );
}

export function useNamedTheme() {
    const theme = useTheme();
    const setTheme = useContext(NamedThemeSetterContext);

    if (setTheme === undefined) {
        throw new Error("useNamedTheme must be used within a NamedThemeProvider");
    }

    return [theme, setTheme] as const;
}