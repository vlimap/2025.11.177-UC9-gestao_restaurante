import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const backendTarget = env.VITE_BACKEND_TARGET || "http://localhost:3000";
  const apiBase = env.VITE_API_BASE || "/api";

  return {
    server: {
      port: 5173,
      proxy: {
        [apiBase]: {
          target: backendTarget,
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp(`^${apiBase}`), "")
        }
      }
    }
  };
});
