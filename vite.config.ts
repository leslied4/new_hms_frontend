import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    allowedHosts: [
      'd8e6-154-160-18-216.ngrok-free.app',
      '.ngrok-free.app',
      '.ngrok.io',
    ],
  },
});
