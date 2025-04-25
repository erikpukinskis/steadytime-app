import path from "path"
import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"

const inCodespace = Boolean(process.env.GITHUB_CODESPACE_TOKEN)

export default defineConfig(({ mode }) => {
  // // Load env file based on `mode` in the current working directory.
  // // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  // const env = loadEnv(mode, process.cwd(), "")

  return {
    envDir: process.cwd(), // Needed because the app is in app/ but .env.local is in the root
    server: {
      ...(inCodespace
        ? {
            hmr: {
              port: 443,
            },
          }
        : {}),
    },

    resolve: {
      alias: {
        "~": path.resolve(__dirname, "./app"),
        "@convex": path.resolve(__dirname, "./convex/_generated"),
      },
    },

    plugins: [react()],

    build: {
      rollupOptions: {},
    },
  }
})
