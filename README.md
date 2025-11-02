# 🗓️ Google Calendar Clone

A fullstack high-fidelity clone of Google Calendar replicating its UI and logic — including month/week/day views, event creation/edit/delete, theme settings, and sidebar mini calendar.
## 🚀 Live Demo


Not deployed — run locally or deploy via Vercel/Netlify.


## Documentation

## 📘 Overview
This project replicates Google Calendar’s interface and interactions with realistic Google-like design.

### Highlights
- React + Vite frontend
- Node.js + Express + SQLite backend
- Event creation, editing, deletion
- Smooth modal transitions
- Light/Dark mode
- Settings, tasks, and calendar toggles
## 🏗️ Architecture Overview

The Google Calendar Clone is designed using a modular client-server architecture.

**Frontend (React + Vite):**
- Manages user interface, event modals, sidebar, and calendar views.
- Uses `react-big-calendar` for visual calendar rendering and `moment.js` for date management.
- Axios handles API requests to the backend.

**Backend (Node.js + Express):**
- Exposes REST API endpoints (`/api/events`) for event CRUD operations.
- Stores all events persistently in an SQLite database.
- Automatically initializes `db.sqlite` if not found.

**Data Flow:**
1. User creates or edits an event → triggers Axios request to `/api/events`.
2. Backend updates the database.
3. Updated data is fetched and displayed instantly in the React UI.
## ⚙️ Installation



### Frontend
1. Install dependencies:
   npm install

2. Run dev server:
   npm run dev

3. Open in browser:
   http://localhost:5173

If package.json is missing scripts:
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}

---

### Backend
1. Go to backend folder:
   cd server

2. Install dependencies:
   npm install

3. Run server:
   npm run dev

Backend runs at:
http://localhost:3001

---

### Connect Frontend & Backend
Set environment variable:
export VITE_API_URL=http://localhost:3001/api
## 🧩 Run Locally


# Start backend
cd server
npm run dev

# Start frontend (in another terminal)
npm run dev

Then open http://localhost:5173

## 🧠 Technology Stack

| Layer | Technology | Why |
|-------|-------------|-----|
| Frontend | React + Vite | Fast, reactive setup |
| Calendar | react-big-calendar | Realistic Google Calendar-like view |
| Date Handling | Moment.js | Simplifies formatting and time handling |
| Backend | Node.js + Express | Lightweight REST API |
| Database | SQLite | Simple persistent local DB |
| Styling | CSS3 | Google-style responsive layout |


## 🧠 Business Logic & Edge Cases

- **Event Overlaps:** Automatically handled by `react-big-calendar` layout, which arranges overlapping events side-by-side.
- **Recurring Events:** Currently supports single-instance events. Future versions will add repeat patterns (daily, weekly, monthly).
- **Validation:** Users must provide a title, start, and end time before saving.
- **Timezone Handling:** Times are stored as ISO strings and converted using Moment.js.
- **View Sync:** The selected view (month/week/day) and current date are stored in React state to maintain UI consistency when navigating.
## 🌟 Features

- Create, edit, delete events  
- Month, week, day, and agenda views  
- Modal with fade transitions  
- Light/Dark mode toggle  
- Sidebar mini calendar with quick navigation  
- “Today” button navigation  
- Settings dropdown and appearance controls  


## 🎞️ Animations & Interactions

- Smooth **modal transitions** using CSS `opacity` and `transform` effects for open/close.
- Subtle **hover highlights** on buttons and sidebar elements.
- **Dropdown menus** scale in and fade smoothly for realism.
- **Dark/Light theme** toggle applied via root class (`.app-root.dark`).
- Responsive layout using **Flexbox and Grid**, ensuring pixel-perfect alignment across screen sizes.
## 👨‍💻 Author

**Ravish Kumar**  
- GitHub: [Ravishrk124](https://github.com/Ravishrk124)  
- LinkedIn: [linkedin.com/in/ravish-kumar-08ba0524b](https://linkedin.com/in/ravish-kumar-08ba0524b)


## 📄 License

This project is open-source under the MIT License.
