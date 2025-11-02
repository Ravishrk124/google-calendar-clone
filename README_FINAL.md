Google Calendar Clone

React + Vite frontend with Express + SQLite backend.

Features:
- Month / Week / Day views (react-big-calendar)
- Create / Edit / Delete events (modal)
- Drag & drop to move and resize events
- Validation and conflict checking
- Persistent SQLite storage (server/calendar.db)
- Polished toolbar and colored events

Run:
1) Server:
cd server
npm install
node index.js

2) Client:
cd client
npm install
npm install react-dnd react-dnd-html5-backend
export VITE_API_URL="http://localhost:3001/api"
npm run dev

Open the Vite URL shown in terminal (usually http://localhost:5173)
