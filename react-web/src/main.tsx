import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from 'src/App';
import { createGlobalStyle, AlertVariant, css } from 'styled-components';
import CacheProvider from "react-inlinesvg/provider";
import { NamedThemeProvider } from 'src/NamedTheme';
import { ErrorBoundary } from 'react-error-boundary';
import { EnvProvider } from 'src/Env';

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

        overflow-anchor: none; // Fixes a few React bugs

        color: ${({ theme }) => theme.textColor};
        li::marker {
            color: ${({ theme }) => theme.textColor};
        }

        background-color: ${({ theme }) => theme.backgroundColor};
    }

    // Override Bootstrap Alert styles where applicable
    ${({ theme }) => {
        if (!theme.alerts) return null;

        return Object.entries(theme.alerts).map(([variant, styles]) => {
            variant = variant as AlertVariant | 'default';
            if (variant === 'default') return null;

            return css`
                .alert-${variant} {
                    ${styles.backgroundColor && `--bs-alert-bg: ${styles.backgroundColor ?? theme.alerts?.default?.backgroundColor};`}
                    ${styles.textColor && `--bs-alert-color: ${styles.textColor ?? theme.alerts?.default?.textColor};`}
                    ${(styles.borderColor) && `--bs-alert-border-color: ${styles.borderColor ?? theme.alerts?.default?.borderColor};`}
                    ${(styles.linkColor ?? styles.textColor) && `--bs-alert-link-color: ${
                        styles.linkColor ?? styles.textColor ??
                        theme.alerts?.default?.linkColor ?? theme.alerts?.default?.textColor
                    };`}
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