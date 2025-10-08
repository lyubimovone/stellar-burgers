import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      DISABLE_WEBPACK_DEV_SERVER_OVERLAY: true
    }
  }
});
