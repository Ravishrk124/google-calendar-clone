# Google Calendar Clone

## Live demo
(Not deployed) — follow Setup to run locally or deploy to Vercel/Netlify.

## Overview
This project is a high-fidelity fullstack clone of Google Calendar. It includes month/week/day views, event creation/edit/delete, a sidebar mini-calendar, settings menu (appearance), and a backend API for event persistence.

## Tech stack
- Frontend: React + Vite
- Calendar view: react-big-calendar + moment
- HTTP client: axios
- Backend: Node.js + Express (lightweight API)
- Database: SQLite (server/ uses SQLite for simple persistence)
- Styling: plain CSS with a single app stylesheet
- Deployment options: Vercel / Netlify (frontend), any Node host for backend

## Architecture
- Frontend (client/)
  - App.jsx: main UI, header controls, calendar wrapper
  - Sidebar.jsx: mini-month, create button, calendar lists
  - EventModal.jsx: create/edit modal
  - public/img: static images served at /img/...
  - Uses react-big-calendar for rendering views; app manages `view` and `date` at top-level and passes them to the calendar.
- Backend (server/)
  - index.js: Express API routes for events
  - db.sqlite: SQLite file (created on first run)
  - seed.js: optional script to pre-seed events

## Setup and run instructions

### Frontend
1. Install dependencies
   - `npm install`
2. Add scripts in `package.json` if missing:
   - `"dev": "vite"`
   - `"build": "vite build"`
   - `"preview": "vite preview"`
3. Start dev server
   - `npm run dev`
4. Open the printed URL (default `http://localhost:5173`).

### Backend
1. `cd server`
2. `npm install`
3. Start server:
   - `npm run dev` or `node index.js`
4. Default API base: `http://localhost:3001/api`
5. Ensure frontend `VITE_API_URL` points to backend, e.g. `export VITE_API_URL=http://localhost:3001/api`

### Full local run
1. Start backend first (`cd server && npm run dev`)
2. From project root start frontend (`npm run dev`)

## How images are used
Place images in `public/img/` and reference them like:
```jsx
<img src="/img/addicon.PNG" alt="add" />


Open browser at http://localhost:5173

If missing scripts, add to package.json:
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
Backend
cd server
npm install
npm run dev
