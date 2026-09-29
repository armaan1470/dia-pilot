# DiaPilot frontend

Mobile Next.js frontend for DiaPilot, with Arabic and English chat and service discovery.

## Run locally

Start the backend in the sibling diapilot project on port 3002. Run its database migration and service seed command first:

    npm run migration:run
    npm run services:seed

Then start the frontend:

    pnpm install
    pnpm dev

Open http://localhost:3000. Chat uses the frontend /api/chat proxy and backend POST /chat. The service directory and detail pages use /api/services and /api/services/:slug, which proxy to the corresponding backend endpoints. In local development, draft entries appear with an internal-preview label.

The default backend URL is http://127.0.0.1:3002. To use a different address, set DIAPILOT_API_URL in this project's .env.local and deployment environment:

    DIAPILOT_API_URL=http://127.0.0.1:3002

This is a server-side variable. Do not put API credentials in a NEXT_PUBLIC_ variable. Staging and production APIs return approved service records only.
