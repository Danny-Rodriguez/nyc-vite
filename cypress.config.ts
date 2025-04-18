import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    specPattern: "**/*.cy.ts",
    setupNodeEvents(on, config) {
      // implement node event listeners here if needed
      return config;
    },
    experimentalStudio: true,
  },
});
