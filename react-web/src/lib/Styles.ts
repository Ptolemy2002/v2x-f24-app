import { ButtonVariant, css, ButtonStyles, DefaultTheme, ModalStyles, ModalVariant } from "styled-components";

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
            ?? "1px",

        $borderColor:
            props.$borderColor
            ?? theme.buttons?.[variant]?.borderColor
            ?? theme.buttons?.default?.borderColor
            ?? defaults.borderColor
            ?? "black",
        $activeBorderColor:
            props.$activeBorderColor
            ?? theme.buttons?.[variant]?.activeBorderColor
            ?? theme.buttons?.default?.activeBorderColor
            ?? props.$borderColor
            ?? theme.buttons?.[variant]?.borderColor
            ?? theme.buttons?.default?.borderColor
            ?? defaults.borderColor
            ?? "black",
        $hoverBorderColor:
            props.$hoverBorderColor
            ?? theme.buttons?.[variant]?.hoverBorderColor
            ?? theme.buttons?.default?.hoverBorderColor
            ?? props.$borderColor
            ?? theme.buttons?.[variant]?.borderColor
            ?? theme.buttons?.default?.borderColor
            ?? defaults.borderColor
            ?? "black",
        $disabledBorderColor:
            props.$disabledBorderColor
            ?? theme.buttons?.[variant]?.disabledBorderColor
            ?? theme.buttons?.default?.disabledBorderColor
            ?? props.$borderColor
            ?? theme.buttons?.[variant]?.borderColor
            ?? theme.buttons?.default?.borderColor
            ?? defaults.borderColor
            ?? "black",

        
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

export function evaluateModalStyles(
    theme: DefaultTheme, props: Scoped<ModalStyles>,
    variant: ModalVariant
): Required<Scoped<ModalStyles>> {
    return {
        $zIndex:
            props.$zIndex
            ?? theme.modals?.[variant]?.zIndex
            ?? theme.modals?.default?.zIndex
            ?? theme.zIndex,

        $textColor:
            props.$textColor
            ?? theme.modals?.[variant]?.textColor
            ?? theme.modals?.default?.textColor
            ?? theme.textColor,
        $backgroundColor:
            props.$backgroundColor
            ?? theme.modals?.[variant]?.backgroundColor
            ?? theme.modals?.default?.backgroundColor
            ?? theme.backgroundColor,

        $borderStyle:
            props.$borderStyle
            ?? theme.modals?.[variant]?.borderStyle
            ?? theme.modals?.default?.borderStyle
            ?? "solid",
        $borderColor:
            props.$borderColor
            ?? theme.modals?.[variant]?.borderColor
            ?? theme.modals?.default?.borderColor
            ?? "black",
        $borderWidth:
            props.$borderWidth
            ?? theme.modals?.[variant]?.borderWidth
            ?? theme.modals?.default?.borderWidth
            ?? "1px",
        $radius:
            props.$radius
            ?? theme.modals?.[variant]?.radius
            ?? theme.modals?.default?.radius
            ?? "0",

        $whiteCloseButton:
            props.$whiteCloseButton
            ?? theme.modals?.[variant]?.whiteCloseButton
            ?? theme.modals?.default?.whiteCloseButton
            ?? false,

        $header: {
            borderColor:
                props.$header?.borderColor
                ?? theme.modals?.[variant]?.header?.borderColor
                ?? theme.modals?.default?.header?.borderColor
                ?? theme.modals?.[variant]?.borderColor
                ?? theme.modals?.default?.borderColor
                ?? "black",
            borderWidth:
                props.$header?.borderWidth
                ?? theme.modals?.[variant]?.header?.borderWidth
                ?? theme.modals?.default?.header?.borderWidth
                ?? theme.modals?.[variant]?.borderWidth
                ?? theme.modals?.default?.borderWidth
                ?? "1px",
        }
    }
}

export function modalStyles(props: Scoped<ModalStyles>) {
    return css`
        --bs-modal-z-index: ${props.$zIndex};
        --bs-modal-color: ${props.$textColor};
        --bs-modal-bg: ${props.$backgroundColor};

        --bs-modal-border-color: ${props.$borderColor};
        --bs-modal-border-width: ${props.$borderWidth};
        --bs-modal-border-radius: ${props.$radius};

        --bs-modal-header-border-width: ${props.$header?.borderWidth};
        --bs-modal-header-border-color: ${props.$header?.borderColor};

        .btn-close {
            ${
                props.$whiteCloseButton && css`
                    filter: var(--bs-btn-close-white-filter);
                `
            }
        }

        border-style: ${props.$borderStyle};
    `;
}