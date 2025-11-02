import React, { useEffect, useMemo, useState, useRef } from "react";
import axios from "axios";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./App.css";

import Sidebar from "./Sidebar";
import EventModal from "./EventModal";

const localizer = momentLocalizer(moment);

export default function App() {
  const API = import.meta.env.VITE_API_URL || "http://localhost:3001/api";
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const [view, setView] = useState("month");
  const [currentDate, setCurrentDate] = useState(new Date());

  // UI state
  const [viewsMenuOpen, setViewsMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [appearance, setAppearance] = useState("light"); // light | dark | system
  const [sideMode, setSideMode] = useState("calendar"); // calendar | tasks

  const calendarRef = useRef(null);

  // fetch events
  const loadEvents = async () => {
    try {
      const res = await axios.get(`${API}/events`);
      setEvents(
        res.data.map((e) => ({
          ...e,
          start: new Date(e.start),
          end: new Date(e.end),
        }))
      );
    } catch (err) {
      console.error("Failed load events", err);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  // close popovers on outside click / escape
  useEffect(() => {
    const onDoc = (e) => {
      if (!e.target.closest?.(".views-menu")) setViewsMenuOpen(false);
      if (!e.target.closest?.(".settings-menu")) setSettingsOpen(false);
      if (!e.target.closest?.(".create-popover")) setCreateOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") {
        setViewsMenuOpen(false);
        setSettingsOpen(false);
        setCreateOpen(false);
      }
    };
    document.addEventListener("click", onDoc);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDoc);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const handleSelectSlot = (slotInfo) => {
    setSelectedEvent(null);
    setSelectedSlot(slotInfo);
    setModalOpen(true);
  };

  const handleSelectEvent = (ev) => {
    setSelectedEvent(ev);
    setSelectedSlot(null);
    setModalOpen(true);
  };

  const handleSaveEvent = async (data) => {
    try {
      if (data.id) await axios.put(`${API}/events/${data.id}`, data);
      else await axios.post(`${API}/events`, data);
      await loadEvents();
      setModalOpen(false);
    } catch (err) {
      console.error("save failed", err);
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await axios.delete(`${API}/events/${id}`);
      await loadEvents();
      setModalOpen(false);
    } catch (err) {
      console.error("delete failed", err);
    }
  };

  // Today: navigate calendar to *today* but keep current view unchanged
  const goToday = () => {
    setCurrentDate(new Date());
  };

  // Prev / Next based on view
  const goPrev = () => {
    if (view === "month") setCurrentDate((d) => moment(d).subtract(1, "month").toDate());
    else if (view === "week") setCurrentDate((d) => moment(d).subtract(1, "week").toDate());
    else setCurrentDate((d) => moment(d).subtract(1, "day").toDate());
  };
  const goNext = () => {
    if (view === "month") setCurrentDate((d) => moment(d).add(1, "month").toDate());
    else if (view === "week") setCurrentDate((d) => moment(d).add(1, "week").toDate());
    else setCurrentDate((d) => moment(d).add(1, "day").toDate());
  };

  const eventsMemo = useMemo(() => events, [events]);

  // apply appearance to root (light/dark)
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = appearance;
  }, [appearance]);

  // Search click: open small prompt (simple) — you can replace with a proper popover later
  const onSearchClick = () => {
    const q = prompt("Search events (quick):");
    if (q) {
      // just a placeholder action for now
      alert(`Search for: ${q}`);
    }
  };

  return (
    <div className={`app-root`}>
      {/* Topbar: single-line, merged with left background */}
      <header className="topbar merged">
        <div className="topbar-left">
          <div className="brand">
            <div className="brand-icon">📅</div>
            <div className="brand-title">Google Calendar Clone</div>
          </div>

          <div className="top-controls">
            <button className="btn oval today-btn" onClick={goToday}>
              Today
            </button>

            <button className="icon-btn" title="Previous" onClick={goPrev}>
              ‹
            </button>
            <button className="icon-btn" title="Next" onClick={goNext}>
              ›
            </button>

            <div className="month-title header-center">{moment(currentDate).format("MMMM YYYY")}</div>
          </div>
        </div>

        <div className="topbar-right">
          {/* SEARCH ICON BUTTON (replaces search bar) */}
          <button className="search-btn" aria-label="Search events" onClick={onSearchClick}>🔍</button>

          {/* Views dropdown */}
          <div className="views-wrapper">
            <button
              className="btn small outline"
              onClick={(e) => {
                e.stopPropagation();
                setViewsMenuOpen((s) => !s);
                setSettingsOpen(false);
                setCreateOpen(false);
              }}
            >
              {view.charAt(0).toUpperCase() + view.slice(1)} <span className="caret">▾</span>
            </button>

            {viewsMenuOpen && (
              <div className="views-menu card-pop">
                <h4>Views</h4>
                <button className={`menu-btn ${view === "day" ? "active" : ""}`} onClick={() => { setView("day"); setViewsMenuOpen(false); }}>Day</button>
                <button className={`menu-btn ${view === "week" ? "active" : ""}`} onClick={() => { setView("week"); setViewsMenuOpen(false); }}>Week</button>
                <button className={`menu-btn ${view === "month" ? "active" : ""}`} onClick={() => { setView("month"); setViewsMenuOpen(false); }}>Month</button>
                <button className={`menu-btn ${view === "agenda" ? "active" : ""}`} onClick={() => { setView("agenda"); setViewsMenuOpen(false); }}>Schedule</button>
                <button className={`menu-btn ${view === "4days" ? "active" : ""}`} onClick={() => { setView("4days"); setViewsMenuOpen(false); }}>4 days</button>

                <div style={{ height: 8 }} />
                <h4>Show</h4>
                <label className="check"><input type="checkbox" defaultChecked /> Show weekends</label>
                <label className="check"><input type="checkbox" defaultChecked /> Show declined events</label>
                <label className="check"><input type="checkbox" defaultChecked /> Show completed tasks</label>
              </div>
            )}
          </div>

          {/* Create button -> popover */}
          <div className="create-wrapper">
            <button
              className="create-main"
              onClick={(e) => {
                e.stopPropagation();
                setCreateOpen((s) => !s);
                setViewsMenuOpen(false);
                setSettingsOpen(false);
              }}
            >
              + Create ▾
            </button>

            {createOpen && (
              <div className="create-popover card-pop">
                <button className="menu-btn" onClick={() => { setCreateOpen(false); setModalOpen(true); setSelectedSlot({ start: new Date(), end: new Date(Date.now() + 60 * 60 * 1000) }); }}>Event</button>
                <button className="menu-btn" onClick={() => { alert("Task flow placeholder"); }}>Task</button>
                <button className="menu-btn" onClick={() => { alert("Appointment flow placeholder"); }}>Appointment</button>
              </div>
            )}
          </div>

          {/* Settings gear */}
          <div className="settings-wrapper">
            <button
              className="icon-btn gear"
              title="Settings"
              onClick={(e) => {
                e.stopPropagation();
                setSettingsOpen((s) => !s);
                setViewsMenuOpen(false);
                setCreateOpen(false);
              }}
            >
              ⚙
            </button>

            {settingsOpen && (
              <div className="settings-menu card-pop">
                <h4>Appearance</h4>
                <div className="appearance-row">
                  <button className={`appearance-btn ${appearance === "light" ? "active" : ""}`} onClick={() => setAppearance("light")}>🌞 Light</button>
                  <button className={`appearance-btn ${appearance === "dark" ? "active" : ""}`} onClick={() => setAppearance("dark")}>🌙 Dark</button>
                  <button className={`appearance-btn ${appearance === "system" ? "active" : ""}`} onClick={() => setAppearance("system")}>🖥 System</button>
                </div>

                <div style={{ marginTop: 10 }} />
                <button className="menu-btn" onClick={() => { window.print(); }}>Print (PDF)</button>
                <button className="menu-btn disabled" onClick={() => alert("Get add-ons placeholder")}>Get add-ons</button>
              </div>
            )}
          </div>

          {/* Calendar / Tasks toggle */}
          <div className="switch-toggle">
            <button className={`pill ${sideMode === "calendar" ? "active" : ""}`} onClick={() => setSideMode("calendar")}>Calendar</button>
            <button className={`pill ${sideMode === "tasks" ? "active" : ""}`} onClick={() => setSideMode("tasks")}>Tasks</button>
          </div>

          <div className="avatar">R</div>
        </div>
      </header>

      {/* Main area: sidebar + center card */}
      <div className="main-area merged">
        <Sidebar
          currentDate={currentDate}
          onDayClick={(d) => { setCurrentDate(d); setView("day"); }}
          onCreate={() => {
            setSelectedSlot({ start: new Date(), end: new Date(Date.now() + 60 * 60 * 1000) });
            setSelectedEvent(null);
            setModalOpen(true);
          }}
        />

        <main className="calendar-wrap">
          <div className="calendar-card">
            <Calendar
              ref={calendarRef}
              localizer={localizer}
              events={eventsMemo}
              startAccessor="start"
              endAccessor="end"
              style={{ height: "72vh" }}
              selectable
              view={view}
              onView={(v) => setView(v)}
              date={currentDate}
              onNavigate={(date) => setCurrentDate(date)}
              onSelectSlot={handleSelectSlot}
              onSelectEvent={handleSelectEvent}
              eventPropGetter={(event) => ({
                style: { backgroundColor: event.color || "#1a73e8", border: "none" },
              })}
            />
          </div>
        </main>
      </div>

      {modalOpen && (
        <EventModal
          event={selectedEvent}
          slot={selectedSlot}
          events={eventsMemo}
          onClose={() => setModalOpen(false)}
          onSave={handleSaveEvent}
          onDelete={handleDeleteEvent}
        />
      )}
    </div>
  );
}