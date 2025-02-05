import { ButtonVariant, css, ButtonStyles, DefaultTheme } from "styled-components";

export type Scoped<T extends Record<string, unknown>> = {
    [K in keyof T as `$${Extract<K, string>}`]: T[K]
};

export function evaluateButtonStyles(
    theme: DefaultTheme, props: Scoped<ButtonStyles>,
    variant: ButtonVariant,
    defaults: Partial<ButtonStyles> = {}
): Required<Scoped<ButtonStyles>> {
    return {
        $radius:
            props.$radius
            ?? theme.buttons?.[variant]?.radius
            ?? theme.buttons?.default?.radius
            ?? defaults.radius
            ?? "0",
        
        $borderStyle: 
            props.$borderStyle
            ?? theme.buttons?.[variant]?.borderStyle
            ?? theme.buttons?.default?.borderStyle
            ?? defaults.borderStyle
            ?? "none",
        $borderWidth:
            props.$borderWidth
            ?? theme.buttons?.[variant]?.borderWidth
            ?? theme.buttons?.default?.borderWidth
            ?? defaults.borderWidth
            ?? theme.borderWidth,

        $borderColor:
            props.$borderColor
            ?? theme.buttons?.[variant]?.borderColor
            ?? theme.buttons?.default?.borderColor
            ?? defaults.borderColor
            ?? theme.borderColor,
        $activeBorderColor:
            props.$activeBorderColor
            ?? theme.buttons?.[variant]?.activeBorderColor
            ?? theme.buttons?.default?.activeBorderColor
            ?? props.$borderColor
            ?? theme.buttons?.[variant]?.borderColor
            ?? theme.buttons?.default?.borderColor
            ?? defaults.borderColor
            ?? theme.borderColor,
        $hoverBorderColor:
            props.$hoverBorderColor
            ?? theme.buttons?.[variant]?.hoverBorderColor
            ?? theme.buttons?.default?.hoverBorderColor
            ?? props.$borderColor
            ?? theme.buttons?.[variant]?.borderColor
            ?? theme.buttons?.default?.borderColor
            ?? defaults.borderColor
            ?? theme.borderColor,
        $disabledBorderColor:
            props.$disabledBorderColor
            ?? theme.buttons?.[variant]?.disabledBorderColor
            ?? theme.buttons?.default?.disabledBorderColor
            ?? props.$borderColor
            ?? theme.buttons?.[variant]?.borderColor
            ?? theme.buttons?.default?.borderColor
            ?? defaults.borderColor
            ?? theme.borderColor,

        
        $backgroundColor:
            props.$backgroundColor
            ?? theme.buttons?.[variant]?.backgroundColor
            ?? theme.buttons?.default?.backgroundColor
            ?? defaults.backgroundColor
            ?? "transparent",
        $activeBackgroundColor:
            props.$activeBackgroundColor
            ?? theme.buttons?.[variant]?.activeBackgroundColor
            ?? theme.buttons?.default?.activeBackgroundColor
            ?? props.$backgroundColor
            ?? theme.buttons?.[variant]?.backgroundColor
            ?? theme.buttons?.default?.backgroundColor
            ?? defaults.backgroundColor
            ?? "transparent",
        $hoverBackgroundColor:
            props.$hoverBackgroundColor
            ?? theme.buttons?.[variant]?.hoverBackgroundColor
            ?? theme.buttons?.default?.hoverBackgroundColor
            ?? props.$backgroundColor
            ?? theme.buttons?.[variant]?.backgroundColor
            ?? theme.buttons?.default?.backgroundColor
            ?? defaults.backgroundColor
            ?? "transparent",
        $disabledBackgroundColor:
            props.$disabledBackgroundColor
            ?? theme.buttons?.[variant]?.disabledBackgroundColor
            ?? theme.buttons?.default?.disabledBackgroundColor
            ?? props.$backgroundColor
            ?? theme.buttons?.[variant]?.backgroundColor
            ?? theme.buttons?.default?.backgroundColor
            ?? defaults.backgroundColor
            ?? "transparent",
        
        $textColor:
            props.$textColor
            ?? theme.buttons?.[variant]?.textColor
            ?? theme.buttons?.default?.textColor
            ?? defaults.textColor
            ?? theme.textColor,
        $activeTextColor:
            props.$activeTextColor
            ?? theme.buttons?.[variant]?.activeTextColor
            ?? theme.buttons?.default?.activeTextColor
            ?? props.$textColor
            ?? theme.buttons?.[variant]?.textColor
            ?? theme.buttons?.default?.textColor
            ?? defaults.textColor
            ?? theme.textColor,
        $hoverTextColor:
            props.$hoverTextColor
            ?? theme.buttons?.[variant]?.hoverTextColor
            ?? theme.buttons?.default?.hoverTextColor
            ?? props.$textColor
            ?? theme.buttons?.[variant]?.textColor
            ?? theme.buttons?.default?.textColor
            ?? defaults.textColor
            ?? theme.textColor,
        $disabledTextColor:
            props.$disabledTextColor
            ?? theme.buttons?.[variant]?.disabledTextColor
            ?? theme.buttons?.default?.disabledTextColor
            ?? props.$textColor
            ?? theme.buttons?.[variant]?.textColor
            ?? theme.buttons?.default?.textColor
            ?? defaults.textColor
            ?? theme.textColor,
    }
}

export function buttonStyles(props: Scoped<ButtonStyles>) {
    return css`
        --bs-btn-bg: ${props.$backgroundColor};
        --bs-btn-hover-bg: ${props.$hoverBackgroundColor};
        --bs-btn-active-bg: ${props.$activeBackgroundColor};
        --bs-btn-border-color: ${props.$borderColor};
        --bs-btn-disabled-bg: ${props.$disabledBackgroundColor};

        border-style: ${props.$borderStyle};
        border-width: ${props.$borderWidth};
        border-radius: ${props.$radius};

        --bs-btn-border-color: ${props.$borderColor};
        --bs-btn-active-border-color: ${props.$activeBorderColor};
        --bs-btn-hover-border-color: ${props.$hoverBorderColor};
        --bs-btn-disabled-border-color: ${props.$disabledBorderColor};

        --bs-btn-color: ${props.$textColor};
        --bs-btn-active-color: ${props.$activeTextColor};
        --bs-btn-hover-color: ${props.$hoverTextColor};
        --bs-btn-disabled-color: ${props.$disabledTextColor};
    `;
}