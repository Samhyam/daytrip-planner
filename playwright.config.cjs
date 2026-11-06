const { defineConfig } = require('@playwright/test')

module.exports = defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    ['list'],
    ['json', { outputFile: 'tests/reports/e2e.json' }],
    ['html', { outputFolder: 'tests/reports/playwright-html', open: 'never' }],
  ],
  use: {
    baseURL: 'http://127.0.0.1:4179',
    browserName: 'chromium',
    headless: true,
    trace: 'off',
    screenshot: 'off',
    video: 'off',
  },
  webServer: {
    command: 'node tests/support/static-server.cjs',
    url: 'http://127.0.0.1:4179/index.html',
    reuseExistingServer: !process.env.CI,
    timeout: 10_000,
  },
})
