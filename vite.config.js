// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // or whatever port your frontend uses
    proxy: {
      // ✅ Redirect all Netlify Function calls to your local backend
      "/.netlify/functions": {
        target: "http://localhost:5050", // where your backend runs
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
