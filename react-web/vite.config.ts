import { resolve, dirname } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const __dirname = dirname(".");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react()
  ],
  publicDir: 'public',

  resolve: {
    alias: {
      "src": resolve(__dirname, 'src')
    }
  },

  define: {
    // One package depends on process.platform being defined
    "process.platform": JSON.stringify(process.platform)
  }
})
