import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Root domain site (https://ahmed-develops.github.io/)
  server: {
    port: 5173,
    host: true
  }
});
