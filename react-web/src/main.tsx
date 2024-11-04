import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from 'src/App';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import CacheProvider from "react-inlinesvg/provider";

const GlobalStyle = createGlobalStyle`
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

        background-color: ${({theme}) => theme.backgroundColor};
    }

    // Make sure the root takes up the full height of the screen
    #root {
        height: 100dvh;
        
        display: flex;
        flex-direction: column;

        overflow-anchor: none; // Fixes a few React bugs

        color: ${({theme}) => theme.textColor};
        li::marker {
            color: ${({theme}) => theme.textColor};
        }
    }
`;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CacheProvider>
      <ThemeProvider theme={{
          backgroundColor: "#343541",
          headerBackgroundColor: "#202123",
          textColor: "white",
          senderColor: "#19c37d",
          senderTextColor: "white",
          recepientColor: "#40414F",
          timestampColor: "#bbb",
          inputColor: "#555",
          inputTextColor: "white",
          recepientTextColor: "white",
          audioPlayerProgressColor: "#888",
          audioPlayerBackgroundColor: "#343541",
          borderThickness: "1px",
          borderColor: "white",
          borderStyle: "solid",
      }}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </CacheProvider>
  </StrictMode>,
);