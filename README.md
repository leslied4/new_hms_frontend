# HMS Frontend

React + Vite frontend for HMS templates.

## Requirements

- Node.js 18+ (Node 20 recommended)
- npm 9+

## Setup

```bash
npm install
cp .env.example .env
```

## Environment Variables

`hms_frontend/.env`:

```env
VITE_API_BASE_URL=/api
VITE_BACKEND_ORIGIN=http://127.0.0.1:8000
```

- `VITE_API_BASE_URL`: API path used by the app (usually proxied to backend).
- `VITE_BACKEND_ORIGIN`: backend target used by Vite proxy for `/api`, `/media`, `/img`.

## Run Locally

```bash
npm run dev
```

Default URL: `http://localhost:5173`

## Build and Preview

```bash
npm run build
npm run preview
```

## Ngrok / External Host Access

Vite server allows:

- `d8e6-154-160-18-216.ngrok-free.app`
- `*.ngrok-free.app`
- `*.ngrok.io`

If you use a different tunnel provider or host, add it in `vite.config.ts` under `server.allowedHosts`.

## Common Issues

- `Failed to resolve import ...`: check relative import depth and file paths.
- Backend requests failing in dev: verify `VITE_BACKEND_ORIGIN` points to running backend.
- CORS/proxy confusion: use `/api` relative calls in frontend and let Vite proxy route to backend.
