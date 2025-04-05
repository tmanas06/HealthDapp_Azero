import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    server: {
      host: "::",
      port: 8080,
      headers: {
        "Content-Security-Policy":
          "default-src 'self'; " +
          "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
          "style-src 'self' 'unsafe-inline'; " +
          "img-src 'self' data: https:; " +
          "connect-src 'self' " +
            "http://127.0.0.1:8787 " +
            "http://localhost:8787 " + // include this too
            "https://pulse.walletconnect.org " +
            "https://*.walletconnect.org " +
            "wss://*.walletconnect.org " +
            "ws://localhost:8080 " +
            "wss://localhost:8080 " +
            "https://api.walletconnect.com " +
            "https://cloud.walletconnect.com " +
            "https://uploads.pinata.cloud;"
      },
    },
    define: {
      "import.meta.env.VITE_PROJECT_ID": JSON.stringify(env.VITE_PROJECT_ID),
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
