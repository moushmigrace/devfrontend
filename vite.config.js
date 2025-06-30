import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default {
  server: {
    proxy: {
      "/socket.io": {
        target: "http://localhost:7777",
        ws: true,
      },
      "/api": {
        target: "http://localhost:7777",
        changeOrigin: true,
        secure: false,
      },
    },
  },
};
