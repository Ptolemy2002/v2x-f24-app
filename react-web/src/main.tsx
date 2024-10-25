import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from 'src/App';
import 'src/style/main.less';
import { ThemeProvider } from 'styled-components';

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
        audioPlayerProgressColor: "red",
        audioPlayerBackgroundColor: "black",
    }}>
      <App />
    </ThemeProvider>
  </StrictMode>,
);