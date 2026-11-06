# Security Policy

## Supported versions

Security fixes are intended for the latest version on the repository's default branch.

## Reporting a vulnerability

Please do not report security vulnerabilities in public issues. Use GitHub's **Report a vulnerability** feature in the repository's Security tab, if enabled, or contact the repository maintainer privately.

Include the affected component, impact, reproduction steps, and any suggested mitigation. Avoid including real credentials or personal data.

## Secret handling

- Store `GROQ_API_KEY` and `OPENWEATHER_API_KEY` in server-side environment variables.
- Rotate any credential that has been committed, pasted into a public issue, or otherwise exposed.
- Do not use production credentials in automated tests.
