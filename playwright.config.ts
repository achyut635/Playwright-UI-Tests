import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : 2,
  timeout: 60000,
  expect: {
    timeout: 10000,
  },

  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['allure-playwright', {
      detail: true,
      outputFolder: 'allure-results',
      suiteTitle: true,
      categories: [
        {
          name: 'Ignored tests',
          matchedStatuses: ['skipped'],
        },
        {
          name: 'Infrastructure problems',
          matchedStatuses: ['broken'],
          messageRegex: '.*(?:WebSocket|net::ERR|ECONNREFUSED).*',
        },
        {
          name: 'Test defects',
          matchedStatuses: ['failed'],
        },
      ],
    }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['line'],
  ],

  use: {
    baseURL: 'https://practicesoftwaretesting.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 15000,
    navigationTimeout: 30000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],

  outputDir: 'test-results/',
});
