import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // Allow access via a cloudflared quick tunnel (https://<random>.trycloudflare.com)
    allowedHosts: ['.trycloudflare.com'],
  },
});
