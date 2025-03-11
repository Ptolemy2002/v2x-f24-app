import { scan } from 'react-scan'; // Must be imported before React so it can hijack the dev tools
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from 'src/App';
import { createGlobalStyle, AlertVariant, css } from 'styled-components';
import CacheProvider from "react-inlinesvg/provider";
import { NamedThemeProvider } from 'src/NamedTheme';
import { ErrorBoundary } from 'react-error-boundary';
import { EnvProvider } from 'src/Env';
import { ZodCoercedBoolean } from '@ptolemy2002/regex-utils';

// Calculating this separately, as the real env validation should be done within components
// so errors can be caught by the ErrorBoundary.
const debugMode = ZodCoercedBoolean.default("f").catch(false).parse(import.meta.env.VITE_DEBUG);
const nodeEnv = import.meta.env.NODE_ENV ?? 'development';
if (debugMode) console.log(import.meta.env.NODE_ENV, "Debug mode enabled. react-scan is active.");
scan({
    enabled: nodeEnv === 'development' && debugMode
});

export const GlobalStyle = createGlobalStyle`
    :root {
        // We don't need more than a single page worth of content here.
        overflow: hidden; 
        font-family:
            -apple-system,
            BlinkMacSystemFont,
            'Segoe UI',
            Roboto,
            'Helvetica Neue',
            Arial,
            sans-serif
        ;
    }

    // Make sure the root takes up the full height of the screen
    #root {
        height: 100dvh;
        
        display: flex;
        flex-direction: column;

        color: ${({ theme }) => theme.textColor};
        li::marker {
            color: ${({ theme }) => theme.textColor};
        }

        background-color: ${({ theme }) => theme.backgroundColor};
    }

    #root, .modal {
        overflow-anchor: none; // Fixes a few React bugs
    }

    .error-text {
        color: ${({ theme }) => theme.errorTextColor};
    }

    // Override Bootstrap Alert styles where applicable
    ${({ theme }) => {
        if (!theme.alerts) return null;
        const defaultStyles = theme.alerts?.default;

        return Object.entries(theme.alerts).map(([variant, styles]) => {
            variant = variant as AlertVariant | 'default';
            if (variant === 'default') return null;

            const backgroundColor = styles.backgroundColor ?? defaultStyles?.backgroundColor;
            const textColor = styles.textColor ?? defaultStyles?.textColor;
            const borderColor = styles.borderColor ?? defaultStyles?.borderColor;
            const linkColor = 
                styles.linkColor ?? styles.textColor 
                ?? defaultStyles?.linkColor 
                ?? defaultStyles?.textColor
            ;

            return css`
                .alert-${variant} {
                    ${backgroundColor && `--bs-alert-bg: ${backgroundColor};`}
                    ${textColor && `--bs-alert-color: ${textColor};`}
                    ${borderColor && `--bs-alert-border-color: ${borderColor};`}
                    ${linkColor && `--bs-alert-link-color: ${linkColor};`}
                }  
            `;
        });
    }}
`;

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <CacheProvider>
            <NamedThemeProvider initial="dark">
                <GlobalStyle />
                {/*
                    ErrorBoundary will catch any errors that occur in the children of this component and display the fallback
                    if they happen. ErrorBoundaries can be defined below this one, causing them to catch errors in their children
                    instead of this one at the top level.
                */}
                <ErrorBoundary fallback={<p id="fatal-error">Fatal Error</p>}>
                    <EnvProvider>
                        <App />
                    </EnvProvider>
                </ErrorBoundary>
            </NamedThemeProvider>
        </CacheProvider>
    </StrictMode>,
);