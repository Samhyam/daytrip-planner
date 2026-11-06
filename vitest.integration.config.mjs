import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['tests/integration/**/*.test.mjs'],
    reporters: ['default'],
    testTimeout: 20_000,
    hookTimeout: 20_000,
  },
})
