# Contributing

Thanks for considering a contribution to DayTrip Planner.

## Before you start

- Search existing issues to avoid duplicating work.
- For larger changes, open an issue first to discuss the approach.
- Never include API keys, personal trip data, or other secrets in commits, screenshots, or test fixtures.

## Development setup

- Python 3.10+
- Node.js 22.12+
- Install test dependencies with `npm install`.
- Install the Playwright browser with `npx playwright install chromium`.

The offline demo can be opened directly from `index.html`. AI mode requires `GROQ_API_KEY`; weather verification additionally requires `OPENWEATHER_API_KEY`.

## Quality checks

Run the complete local suite before submitting:

```bash
npm run test:all
```

For focused changes, the relevant suites can be run independently:

```bash
npm run test:backend
npm run test:unit
npm run test:e2e
```

Add or update tests when changing behavior. Keep provider calls mocked in automated tests; live-provider checks belong in the optional integration suite.

## Pull requests

Please include:

- A concise explanation of the problem and solution.
- The user-visible behavior change, if any.
- Tests run and their result.
- Screenshots for meaningful UI changes (desktop and mobile where relevant).

Keep pull requests focused and avoid unrelated formatting churn.
