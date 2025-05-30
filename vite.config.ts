
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Add a null alias for the native module that's failing to resolve
      "../build/Release/index.node": path.resolve(__dirname, "./src/utils/empty-module.js"),
    },
  },
  optimizeDeps: {
    exclude: ['@iota/sdk-wasm'],
  },
}));
