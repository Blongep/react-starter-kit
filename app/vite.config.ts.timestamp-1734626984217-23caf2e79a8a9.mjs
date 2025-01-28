// app/vite.config.ts
import react from "file:///C:/Users/bapti/connectourTemplate/react-starter-kit/.yarn/__virtual__/@vitejs-plugin-react-virtual-d834ac7983/3/AppData/Local/Yarn/Berry/cache/@vitejs-plugin-react-npm-4.2.1-8b9705c544-10.zip/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { URL, fileURLToPath } from "node:url";
import { loadEnv } from "file:///C:/Users/bapti/connectourTemplate/react-starter-kit/.yarn/__virtual__/vite-virtual-797bff1acb/3/AppData/Local/Yarn/Berry/cache/vite-npm-5.1.2-b48a600f22-10.zip/node_modules/vite/dist/node/index.js";
import { defineProject } from "file:///C:/Users/bapti/connectourTemplate/react-starter-kit/.yarn/__virtual__/vitest-virtual-39d6d54b19/3/AppData/Local/Yarn/Berry/cache/vitest-npm-1.2.2-fe6dae0383-10.zip/node_modules/vitest/dist/config.js";
var __vite_injected_original_import_meta_url = "file:///C:/Users/bapti/connectourTemplate/react-starter-kit/app/vite.config.ts";
var publicEnvVars = [
  "APP_ENV",
  "APP_NAME",
  "APP_ORIGIN",
  "GOOGLE_CLOUD_PROJECT",
  "FIREBASE_APP_ID",
  "FIREBASE_API_KEY",
  "FIREBASE_AUTH_DOMAIN",
  "GA_MEASUREMENT_ID"
];
var vite_config_default = defineProject(async ({ mode }) => {
  const envDir = fileURLToPath(new URL("..", __vite_injected_original_import_meta_url));
  const env = loadEnv(mode, envDir, "");
  publicEnvVars.forEach((key) => {
    if (!env[key])
      throw new Error(`Missing environment variable: ${key}`);
    process.env[`VITE_${key}`] = env[key];
  });
  return {
    cacheDir: fileURLToPath(new URL("../.cache/vite-app", __vite_injected_original_import_meta_url)),
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            firebase: ["firebase/analytics", "firebase/app", "firebase/auth"],
            react: ["react", "react-dom", "react-router-dom"]
          }
        }
      }
    },
    plugins: [
      // The default Vite plugin for React projects
      // https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md
      react({
        jsxImportSource: "@emotion/react",
        babel: {
          plugins: ["@emotion/babel-plugin"]
        }
      })
    ],
    server: {
      host: true,
      proxy: {
        "/api": {
          target: process.env.LOCAL_API_ORIGIN ?? process.env.API_ORIGIN,
          changeOrigin: true
        }
      }
    },
    test: {
      ...{ cache: { dir: "../.cache/vitest" } },
      environment: "happy-dom"
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYXBwL3ZpdGUuY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcYmFwdGlcXFxcY29ubmVjdG91clRlbXBsYXRlXFxcXHJlYWN0LXN0YXJ0ZXIta2l0XFxcXGFwcFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcYmFwdGlcXFxcY29ubmVjdG91clRlbXBsYXRlXFxcXHJlYWN0LXN0YXJ0ZXIta2l0XFxcXGFwcFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvYmFwdGkvY29ubmVjdG91clRlbXBsYXRlL3JlYWN0LXN0YXJ0ZXIta2l0L2FwcC92aXRlLmNvbmZpZy50c1wiOy8qIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMTQtcHJlc2VudCBLcmlhc29mdCAqL1xuLyogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IE1JVCAqL1xuXG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XG5pbXBvcnQgeyBVUkwsIGZpbGVVUkxUb1BhdGggfSBmcm9tIFwibm9kZTp1cmxcIjtcbmltcG9ydCB7IGxvYWRFbnYgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHsgZGVmaW5lUHJvamVjdCB9IGZyb20gXCJ2aXRlc3QvY29uZmlnXCI7XG5cbmNvbnN0IHB1YmxpY0VudlZhcnMgPSBbXG4gIFwiQVBQX0VOVlwiLFxuICBcIkFQUF9OQU1FXCIsXG4gIFwiQVBQX09SSUdJTlwiLFxuICBcIkdPT0dMRV9DTE9VRF9QUk9KRUNUXCIsXG4gIFwiRklSRUJBU0VfQVBQX0lEXCIsXG4gIFwiRklSRUJBU0VfQVBJX0tFWVwiLFxuICBcIkZJUkVCQVNFX0FVVEhfRE9NQUlOXCIsXG4gIFwiR0FfTUVBU1VSRU1FTlRfSURcIixcbl07XG5cbi8qKlxuICogVml0ZSBjb25maWd1cmF0aW9uLlxuICogaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lUHJvamVjdChhc3luYyAoeyBtb2RlIH0pID0+IHtcbiAgY29uc3QgZW52RGlyID0gZmlsZVVSTFRvUGF0aChuZXcgVVJMKFwiLi5cIiwgaW1wb3J0Lm1ldGEudXJsKSk7XG4gIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgZW52RGlyLCBcIlwiKTtcblxuICBwdWJsaWNFbnZWYXJzLmZvckVhY2goKGtleSkgPT4ge1xuICAgIGlmICghZW52W2tleV0pIHRocm93IG5ldyBFcnJvcihgTWlzc2luZyBlbnZpcm9ubWVudCB2YXJpYWJsZTogJHtrZXl9YCk7XG4gICAgcHJvY2Vzcy5lbnZbYFZJVEVfJHtrZXl9YF0gPSBlbnZba2V5XTtcbiAgfSk7XG5cbiAgcmV0dXJuIHtcbiAgICBjYWNoZURpcjogZmlsZVVSTFRvUGF0aChuZXcgVVJMKFwiLi4vLmNhY2hlL3ZpdGUtYXBwXCIsIGltcG9ydC5tZXRhLnVybCkpLFxuXG4gICAgYnVpbGQ6IHtcbiAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgbWFudWFsQ2h1bmtzOiB7XG4gICAgICAgICAgICBmaXJlYmFzZTogW1wiZmlyZWJhc2UvYW5hbHl0aWNzXCIsIFwiZmlyZWJhc2UvYXBwXCIsIFwiZmlyZWJhc2UvYXV0aFwiXSxcbiAgICAgICAgICAgIHJlYWN0OiBbXCJyZWFjdFwiLCBcInJlYWN0LWRvbVwiLCBcInJlYWN0LXJvdXRlci1kb21cIl0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcblxuICAgIHBsdWdpbnM6IFtcbiAgICAgIC8vIFRoZSBkZWZhdWx0IFZpdGUgcGx1Z2luIGZvciBSZWFjdCBwcm9qZWN0c1xuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3ZpdGVqcy92aXRlLXBsdWdpbi1yZWFjdC9ibG9iL21haW4vcGFja2FnZXMvcGx1Z2luLXJlYWN0L1JFQURNRS5tZFxuICAgICAgcmVhY3Qoe1xuICAgICAgICBqc3hJbXBvcnRTb3VyY2U6IFwiQGVtb3Rpb24vcmVhY3RcIixcbiAgICAgICAgYmFiZWw6IHtcbiAgICAgICAgICBwbHVnaW5zOiBbXCJAZW1vdGlvbi9iYWJlbC1wbHVnaW5cIl0sXG4gICAgICAgIH0sXG4gICAgICB9KSxcbiAgICBdLFxuXG4gICAgc2VydmVyOiB7XG4gICAgICBob3N0OiB0cnVlLFxuICAgICAgcHJveHk6IHtcbiAgICAgICAgXCIvYXBpXCI6IHtcbiAgICAgICAgICB0YXJnZXQ6IHByb2Nlc3MuZW52LkxPQ0FMX0FQSV9PUklHSU4gPz8gcHJvY2Vzcy5lbnYuQVBJX09SSUdJTixcbiAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG5cbiAgICB0ZXN0OiB7XG4gICAgICAuLi57IGNhY2hlOiB7IGRpcjogXCIuLi8uY2FjaGUvdml0ZXN0XCIgfSB9LFxuICAgICAgZW52aXJvbm1lbnQ6IFwiaGFwcHktZG9tXCIsXG4gICAgfSxcbiAgfTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUdBLE9BQU8sV0FBVztBQUNsQixTQUFTLEtBQUsscUJBQXFCO0FBQ25DLFNBQVMsZUFBZTtBQUN4QixTQUFTLHFCQUFxQjtBQU5tTSxJQUFNLDJDQUEyQztBQVFsUixJQUFNLGdCQUFnQjtBQUFBLEVBQ3BCO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGO0FBTUEsSUFBTyxzQkFBUSxjQUFjLE9BQU8sRUFBRSxLQUFLLE1BQU07QUFDL0MsUUFBTSxTQUFTLGNBQWMsSUFBSSxJQUFJLE1BQU0sd0NBQWUsQ0FBQztBQUMzRCxRQUFNLE1BQU0sUUFBUSxNQUFNLFFBQVEsRUFBRTtBQUVwQyxnQkFBYyxRQUFRLENBQUMsUUFBUTtBQUM3QixRQUFJLENBQUMsSUFBSSxHQUFHO0FBQUcsWUFBTSxJQUFJLE1BQU0saUNBQWlDLEdBQUcsRUFBRTtBQUNyRSxZQUFRLElBQUksUUFBUSxHQUFHLEVBQUUsSUFBSSxJQUFJLEdBQUc7QUFBQSxFQUN0QyxDQUFDO0FBRUQsU0FBTztBQUFBLElBQ0wsVUFBVSxjQUFjLElBQUksSUFBSSxzQkFBc0Isd0NBQWUsQ0FBQztBQUFBLElBRXRFLE9BQU87QUFBQSxNQUNMLGVBQWU7QUFBQSxRQUNiLFFBQVE7QUFBQSxVQUNOLGNBQWM7QUFBQSxZQUNaLFVBQVUsQ0FBQyxzQkFBc0IsZ0JBQWdCLGVBQWU7QUFBQSxZQUNoRSxPQUFPLENBQUMsU0FBUyxhQUFhLGtCQUFrQjtBQUFBLFVBQ2xEO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFFQSxTQUFTO0FBQUE7QUFBQTtBQUFBLE1BR1AsTUFBTTtBQUFBLFFBQ0osaUJBQWlCO0FBQUEsUUFDakIsT0FBTztBQUFBLFVBQ0wsU0FBUyxDQUFDLHVCQUF1QjtBQUFBLFFBQ25DO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSDtBQUFBLElBRUEsUUFBUTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLFFBQ0wsUUFBUTtBQUFBLFVBQ04sUUFBUSxRQUFRLElBQUksb0JBQW9CLFFBQVEsSUFBSTtBQUFBLFVBQ3BELGNBQWM7QUFBQSxRQUNoQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFFQSxNQUFNO0FBQUEsTUFDSixHQUFHLEVBQUUsT0FBTyxFQUFFLEtBQUssbUJBQW1CLEVBQUU7QUFBQSxNQUN4QyxhQUFhO0FBQUEsSUFDZjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
