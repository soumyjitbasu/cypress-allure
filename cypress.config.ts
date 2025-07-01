import { defineConfig } from "cypress";
import allureWriter from "@shelex/cypress-allure-plugin/writer";


export default defineConfig({
  projectId: 'qy6eid',
  defaultCommandTimeout: 5000,
  pageLoadTimeout: 80000,
  requestTimeout: 7000,
  responseTimeout: 40000,
  e2e: {
    baseUrl: 'https://todo.qacart.com',
    video: true,
    retries: 0,
    setupNodeEvents(on, config) {
      require('@cypress/grep/src/plugin')(config);
      allureWriter(on, config);
      return config;
    },
    env: {
      grepFilterSpecs: true,
      allure: true,
      allureAttachRequest: true,
      allureAddVideoOnPass: true,
    }
  },
});
