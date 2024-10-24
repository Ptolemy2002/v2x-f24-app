import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from 'src/App';
import 'src/style/main.less';
import { ThemeProvider } from 'styled-components';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={{
        backgroundColor: "black",
        textColor: "white",
        senderColor: "#007bff",
        senderTextColor: "white",
        recepientColor: "#f0f0f0",
        recepientTextColor: "black",
        audioPlayerProgressColor: "red",
        audioPlayerBackgroundColor: "black",
    }}>
      <App />
    </ThemeProvider>
  </StrictMode>,
);