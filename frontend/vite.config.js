import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,       // bind to 0.0.0.0 inside container
    port: 3000,       // match docker-compose 3000:3000
    strictPort: true,
    proxy: {
      "/api": {
        target: "http://backend:8000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
