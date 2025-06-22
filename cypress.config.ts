import { defineConfig } from "cypress";
import allureWriter from "@shelex/cypress-allure-plugin/writer";

export default defineConfig({
  e2e: {
    baseUrl: 'https://todo.qacart.com',
    video: true,
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
    },
    env: {
      allure: true,
      allureAttachRequest: true,
      allureAddVideoOnPass: true,
    }
  },
});
