import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    define: {
      "process.env.NODE_ENV": JSON.stringify(mode), // Define the environment mode (development/production)
      "process.env.API_URL": JSON.stringify(env.VITE_API_URL || ""), // Set API URL from environment variables
    },
    css: {
      postcss: {
        plugins: [tailwindcss, autoprefixer], // Add TailwindCSS and Autoprefixer for CSS processing
      },
    },
    plugins: [
      react(), // React plugin for Vite
      tsconfigPaths(), // Enables TypeScript path alias resolution
    ],
    resolve: {
      alias: {
        "~": "/src", // Use "~" as alias for src/
      },
    },
    server: {
      port: 3000, // Specify the development server port
      open: true, // Open the browser when the server starts
      cors: true, // Enable CORS for the development server
      hmr: {
        overlay: true, // Show overlay for runtime errors
      },
    },
    build: {
      target: "esnext", // Use modern JavaScript features
      sourcemap: mode === "development", // Generate source maps in development mode
      outDir: "dist", // Specify the build output directory
      chunkSizeWarningLimit: 1000, // Increase chunk size limit to avoid warnings
    },
  };
});