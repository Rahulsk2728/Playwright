// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { time } from 'node:console';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',

  timeout: 40 * 1000,
  expect: {
    timeout: 40 * 1000,
  },

  use: {

    browserName: 'chromium',
    headless: false,
    screenshot: 'on',
    trace: 'on'

  },

  /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
});
module.exports = config;

