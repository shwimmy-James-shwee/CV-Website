import react from "@vitejs/plugin-react-swc";
import { defineConfig as defineViteConfig, mergeConfig } from "vite";
import { defineConfig as defineVitestConfig } from "vitest/config";

const viteConfig = defineViteConfig({
  plugins: [react()],
  define: {
    "process.env": {}
  },
  envPrefix: "VITE_",
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          // creating a chunk deps. Reducing the vendor chunk size
          if (id.includes("@azure/msal-browser") || id.includes("@azure/msal-react")) {
            return "@azure-msal";
          }
          if (id.includes("bootstrap")) {
            return "@bootstrap";
          }
          if (id.includes("recharts")) {
            return "@recharts";
          }
          if (id.includes("web-vitals")) {
            return "@web-vitals";
          }
          if (id.includes("react-data-table-component")) {
            return "@react-data-table-component";
          }
          if (id.includes("styled-components") || id.includes("sass")) {
            return "@styles";
          }
          // creating a chunk to react routes deps. Reducing the vendor chunk size
          if (id.includes("react-router-dom") || id.includes("@remix-run") || id.includes("react-router")) {
            return "@react-router";
          }
        }
      }
    }
  }
});

const vitestConfig = defineVitestConfig({
  test: {
    include: ["./src/**/__tests__/**/*.test.tsx"],
    environment: "jsdom",
    globals: true,
    coverage: {
      provider: "istanbul",
      reporter: ["text", "json", "html"],
      reportOnFailure: true,
      thresholds: {
        statements: 75,
        branches: 75,
        functions: 75,
        lines: 75
      },
      include: ["src/**/*.tsx"],
      exclude: [
        "src/App.tsx",
        "src/reportWebVitals.ts",
        "src/main.tsx",
        "**/*.cjs",
        "**/*.d.ts",
        "src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
        "src/*.tsx",
        "src/stories/",
        "src/components/",
        "src/hooks/",
        "src/tests/",
        "src/context/UserContext.tsx",
        "src/pages/UserActivityPage.tsx"
      ]
    },
    setupFiles: "./src/tests/setupTest.ts"
  }
});

export default mergeConfig(viteConfig, vitestConfig);
