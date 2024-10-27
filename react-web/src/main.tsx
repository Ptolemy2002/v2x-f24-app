import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from 'src/App';
import { ThemeProvider } from 'styled-components';
import 'src/less/main.less';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
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
      <App />
    </ThemeProvider>
  </StrictMode>,
);