# DayTrip Planner

Plan a better day out. **DayTrip Planner** turns a few preferences into a structured day-trip itinerary, estimates the costs, and checks the result against the choices you made.

The project includes a polished, responsive browser interface, an optional Python API for AI-powered planning, and an offline demo mode that works without API keys.

> **Important:** AI-generated plans, weather information, travel times, and prices are suggestions or estimates—not live bookings or guaranteed facts. Check important details with the relevant providers before travelling.

## Highlights

- **Guided trip builder** — starting point, destination, date, group size, budget, interests, transport, travel style, and hours.
- **AI Generator + Critic** — separate model calls generate and evaluate an itinerary; the Critic checks schedule, budget, destination relevance, weather evidence, and preference matching.
- **Quality gate** — configurable approval threshold and a correction/review flow for plans that need improvement.
- **Offline demo** — a local rules-based planner and transparent local review when the Python API is not running.
- **Weather-aware planning** — optional OpenWeather geocoding and forecast evidence.
- **Save and revisit** — browser-local saved trips and a destination idea library.
- **Responsive UI** — designed for mobile, tablet, and desktop.
- **Test coverage** — Python backend tests, JavaScript unit tests, and Playwright browser tests.

## Preview

The app is a standalone HTML/CSS/JavaScript frontend. Open `index.html` directly to explore the offline demo, or run the Python server to enable the AI workflow.

## Quick start

### 1. Offline demo (no setup)

Download or clone this repository and open `index.html` in a modern browser.

The demo itinerary and local rules review work without Python, Node.js, or API credentials. Browser storage is used for saved trips and destination ideas.

### 2. AI-powered mode

Requirements:

- Python 3.10+
- A [Groq API key](https://console.groq.com/keys)
- Optional: an [OpenWeather API key](https://openweathermap.org/api) for destination verification and forecast evidence

Clone the repository:

```bash
git clone https://github.com/<your-username>/daytrip-planner.git
cd daytrip-planner
```

Set your Groq key in the current terminal session and start the server.

**macOS / Linux**
```bash
export GROQ_API_KEY="your-groq-api-key"
python -m server.app
```

**Windows PowerShell**
```powershell
$env:GROQ_API_KEY = "your-groq-api-key"
python -m server.app
```

Open <http://127.0.0.1:8000>.

To enable weather verification, also set `OPENWEATHER_API_KEY` before starting the server.

## Configuration

All credentials are read by the Python backend from environment variables. **Never commit API keys, `.env` files, or credentials to Git.**

| Variable | Required | Default | Description |
| --- | --- | --- | --- |
| `GROQ_API_KEY` | For AI mode | — | Groq API key used by the Generator and Critic |
| `GROQ_MODEL` | No | `openai/gpt-oss-120b` | Groq model identifier |
| `OPENWEATHER_API_KEY` | No | — | Enables geocoding and forecast evidence |
| `QUALITY_THRESHOLD` | No | `80` | Approval threshold from 0 to 100 |
| `DAYTRIP_PORT` | No | `8000` | Local server port |

If OpenWeather is not configured, AI planning can still run. The Critic marks weather evidence as unavailable and explains the limitation; the missing optional service is not by itself a critical failure.

The app does not use a live routing or price service. Cost and travel amounts are estimates, and map links open search results.

## How it works

```text
Browser UI
   |
   +-- Offline mode --> Demo itinerary --> Local rules review
   |
   +-- AI mode ------> Python API
                         |
                         +--> Destination lookup / optional forecast
                         |
                         +--> Groq Generator
                         |
                         +--> Deterministic validation
                         |
                         +--> Groq Critic
                         |
                         +--> Quality gate / correction loop
```

The Generator and Critic are separate steps. The Critic receives the trip answers, itinerary, available weather evidence, and deterministic findings. A score is only returned after the review flow completes. The offline rules review is labelled separately and is not represented as an AI evaluation.

### Project structure

```text
.
├── index.html                 # Browser application
├── src/
│   └── planner-core.js        # Shared validation, itinerary, and review logic
├── server/
│   ├── app.py                 # Dependency-free Python HTTP API
│   ├── critic.py              # Itinerary validation and quality review
│   └── providers.py           # Groq and OpenWeather clients
├── tests/
│   ├── unit/                  # Vitest tests
│   ├── python/                # Python unittest suite
│   ├── e2e/                   # Playwright browser journeys
│   ├── integration/           # Optional live-provider smoke tests
│   └── dashboard/             # Local test report dashboard
└── .github/workflows/ci.yml   # GitHub Actions checks
```

## Run the tests

The backend uses only the Python standard library. Frontend test tooling requires Node.js 22.12+.

```bash
npm install
npx playwright install chromium
npm run test:all
```

The combined harness runs:

1. Python backend tests (provider calls mocked)
2. JavaScript unit tests (Vitest)
3. Browser end-to-end tests (Playwright)

A combined report is written to `tests/reports/latest.json`. Generated reports and browser artifacts are intentionally ignored by Git.

Run individual suites:

```bash
npm run test:backend
npm run test:unit
npm run test:e2e
```

The optional live OpenWeather integration test is separate from the default suite:

```bash
# Set OPENWEATHER_API_KEY first
npm run test:integration
```

Start the local report dashboard with:

```bash
npm run test:dashboard
```

Then open <http://127.0.0.1:4180>.

## Security and privacy

- Keep provider keys on the server; do not put them in frontend code.
- Do not commit secrets or real user trip data.
- Saved trips and destination ideas are stored in the current browser's local storage; they are not synced to an account or server.
- The development server binds to `127.0.0.1` and is intended for local use, not direct public deployment.
- See [SECURITY.md](SECURITY.md) for reporting a vulnerability.

## Contributing

Bug reports, focused improvements, and test additions are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.

## License

No open-source license has been added yet. Until the repository owner chooses one, the source is shared for viewing but standard copyright restrictions still apply.
