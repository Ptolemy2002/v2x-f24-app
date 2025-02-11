import { ComponentProps, createContext, useCallback, useContext } from "react";
import { MaybeTransformer } from "@ptolemy2002/ts-utils";
import { ThemeProvider, useTheme } from "styled-components";
import isCallable from "is-callable";
import { DefaultTheme } from "styled-components/dist/types";
import { wrapNumber } from "@ptolemy2002/js-math-utils";
import { usePersistentState } from "@ptolemy2002/react-utils";

export type ThemeProviderProps = ComponentProps<typeof ThemeProvider>;

export type NamedThemeReservedIds = "detect";

export type NamedTheme= {
    id: string;
    displayName: string;
    value: ThemeProviderProps["theme"];
    onSwitch?: (byIndex: boolean) => void;
};

export function createNamedTheme<T extends string>(
    id: T extends NamedThemeReservedIds ? never : T,
    theme: Omit<NamedTheme, "id">
): NamedTheme & {id: T} {
    return {id, ...theme};
}

const backgroundColor = "#343541";
const senderColor = "#19c37d";
const recepientColor = "#40414F";

export const NamedThemes: NamedTheme[] = [
    createNamedTheme("dark", {
        displayName: "Dark",
        value: {
            backgroundColor: backgroundColor,
            
            textColor: "white",
            activeTextColor: senderColor,

            buttons: {
                conversationEdit: {
                    hoverTextColor: senderColor,
                },

                send: {
                    borderStyle: "none",
                    backgroundColor: senderColor,
                    radius: "5px"
                },

                upload: {
                    borderStyle: "none",
                    backgroundColor: senderColor,
                    radius: "5px"
                },

                pausePlay: {
                    borderStyle: "none",
                    backgroundColor: "#666",
                    hoverBackgroundColor: "#555",
                    radius: "5px"
                },

                conversationSettingsSave: {
                    borderStyle: "none",
                    backgroundColor: senderColor,
                    radius: "5px"
                }
            },

            modals: {
                default: {
                    whiteCloseButton: true,
                    header: {
                        borderColor: "white"
                    }
                }
            },

            header: {
                backgroundColor: "#202123"
            },

            sender: {
                color: senderColor,
            },

            recepient: {
                color: recepientColor,
            },

            timestamp: {
                color: "#bbb"
            },
            
            input: {
                color: "#555",
            },

            audioPlayer: {
                progressColor: "#888",
                backgroundColor: backgroundColor,
            },

            icons: {
                danger: {
                    color: "white",
                    backgroundColor: "red"
                }
            },

            border: {
                color: "white",
                thickness: "1px",
                style: "solid"
            }
        }
    })
];

export type SetNamedThemeCallback = (theme: MaybeTransformer<string | number, [string]>) => void;
const NamedThemeSetterContext = createContext<{
    setTheme: SetNamedThemeCallback,
    nextTheme: () => void,
    prevTheme: () => void
} | undefined>(undefined);

export function findThemeByValue(value: DefaultTheme) {
    return NamedThemes.find((theme) => theme.value === value) ?? null;
}

export function findThemeById(id: string) {
    return NamedThemes.find((theme) => theme.id === id) ?? null;
}

export function findThemeIndexById(id: string) {
    return NamedThemes.findIndex((theme) => theme.id === id);
}

export function verifyTheme(theme: string | number) {
    if (typeof theme === "number") {
        if (!NamedThemes[theme]) {
            throw new Error(`Theme with index ${theme} not found`);
        }
        return NamedThemes[theme].id;
    } else if (theme === "detect") {
        return "detect";
    } else if (!findThemeById(theme)) {
        throw new Error(`Theme ${theme} not found`);
    }

    return theme;
}

export function interpretTheme(theme: string | number) {
    if (theme === "detect") {
        return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }

    return verifyTheme(theme);
}

export type NamedThemeProviderProps = Omit<ThemeProviderProps, "theme"> & {initial?: string | number};
export function NamedThemeProvider({initial="detect", ...props}: NamedThemeProviderProps) {
    const [_currentTheme, _setCurrentTheme] = usePersistentState<string>(
        "theme", verifyTheme(initial)
    );

    const currentTheme = interpretTheme(_currentTheme);

    const setTheme = useCallback<SetNamedThemeCallback>((theme) => {
        _setCurrentTheme((prev) => {
            const next = isCallable(theme) ? theme(prev) : theme;
            if (next === prev) return prev;

            if (next === "detect") {
                return "detect";
            } else {
                const nextTheme = findThemeById(verifyTheme(next))!;
                nextTheme.onSwitch?.(typeof next === "number");
                
                return nextTheme.id;
            }
        });
    }, [_setCurrentTheme]);

    const nextTheme = useCallback(() => {
        _setCurrentTheme((prev) => {
            prev = interpretTheme(prev);
            const index = findThemeIndexById(prev);
            return NamedThemes[wrapNumber(index + 1, 0, NamedThemes.length)]!.id;
        });
    }, [_setCurrentTheme]);

    const prevTheme = useCallback(() => {
        _setCurrentTheme((prev) => {
            prev = interpretTheme(prev);
            const index = findThemeIndexById(prev);
            return NamedThemes[wrapNumber(index - 1, 0, NamedThemes.length)]!.id;
        });
    }, [_setCurrentTheme]);

    return (
        <NamedThemeSetterContext.Provider value={{setTheme, nextTheme, prevTheme}}>
            <ThemeProvider theme={findThemeById(currentTheme)!.value} {...props} />
        </NamedThemeSetterContext.Provider>
    );
}

export function useNamedTheme() {
    const theme = useTheme();
    const themeSetter = useContext(NamedThemeSetterContext);

    if (themeSetter === undefined) {
        throw new Error("useNamedTheme must be used within a NamedThemeProvider");
    }

    return [findThemeByValue(theme)!, themeSetter] as const;
}