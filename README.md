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


## 🌟 Features

- Create, edit, delete events  
- Month, week, day, and agenda views  
- Modal with fade transitions  
- Light/Dark mode toggle  
- Sidebar mini calendar with quick navigation  
- “Today” button navigation  
- Settings dropdown and appearance controls  


## 👨‍💻 Author

**Ravish Kumar**  
- GitHub: [Ravishrk124](https://github.com/Ravishrk124)  
- LinkedIn: [linkedin.com/in/ravish-kumar-08ba0524b](https://linkedin.com/in/ravish-kumar-08ba0524b)


## 📄 License

This project is open-source under the MIT License.
