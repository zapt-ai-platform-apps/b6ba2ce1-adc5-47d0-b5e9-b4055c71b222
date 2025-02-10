# ReactJS Website Editor

This application is a fully intuitive website editor that allows the owner to create entire websites using natural language instructions powered by GPT.

## User Journeys

1. [Owner Login](docs/journeys/owner-login.md) - Sign in as the owner to access the editor.
2. [Edit Website](docs/journeys/edit-website.md) - Use the natural language editor to generate and preview a website.

*The app is powered by GPT, Supabase authentication, and ZAPT services. Tracking and error logging are integrated via Sentry and Umami.*

## External API Services

- **OpenAI GPT API**: Generates website content based on natural language instructions.
- **Supabase Auth**: Provides authentication functionality.
- **ZAPT**: Initializes event tracking, login recording, and API integrations.
- **Sentry**: Captures and logs errors from both frontend and backend.
- **Umami Analytics**: Tracks user interactions and app metrics.
- **Progressier**: Enables PWA support for offline capabilities.