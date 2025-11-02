import React from "react";
import moment from "moment";
import "./Sidebar.css"; // optional; included styles mostly in App.css

export default function Sidebar({ currentDate, onDayClick, onCreate }) {
  const start = moment(currentDate).startOf("month").startOf("week");
  const weeks = [];
  for (let r = 0; r < 6; r++) {
    const row = [];
    for (let c = 0; c < 7; c++) {
      row.push(start.clone().add(r * 7 + c, "days"));
    }
    weeks.push(row);
  }

  return (
    <aside className="sidebar">
      <button className="create-btn" onClick={onCreate}>+ Create</button>

      <div className="mini-month">
        <div className="mini-header">
          <strong>November 2025</strong>
          <div>
            <button className="icon-btn-small" title="Prev">‹</button>
            <button className="icon-btn-small" title="Next">›</button>
          </div>
        </div>

        <div className="mini-weeknames">
          {["S","M","T","W","T","F","S"].map((d) => <div className="mini-weekname" key={d}>{d}</div>)}
        </div>

        <div className="mini-grid">
          {weeks.map((week, i) => (
            <div className="mini-row" key={i}>
              {week.map((day) => (
                <div
                  key={day.format()}
                  className={`mini-day ${day.month() !== moment(currentDate).month() ? "muted" : ""}`}
                  onClick={() => onDayClick(day.toDate())}
                >
                  {day.date()}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 12 }}>
          <input className="search-people-input" placeholder="🔍 Search for people" />
        </div>
      </div>

      <div className="calendars">
        <div className="cal-title">Booking pages <button className="icon-btn-small">+</button></div>

        <div style={{ marginTop: 8 }}>
          <div className="cal-title">My calendars</div>
          <label className="cal-item"><input type="checkbox" defaultChecked /> Ravish Kumar</label>
          <label className="cal-item"><input type="checkbox" /> Birthdays</label>
          <label className="cal-item"><input type="checkbox" /> Tasks</label>
        </div>

        <div style={{ marginTop: 14 }}>
          <div style={{ fontSize: 12, color: "#8b8f93" }}>Other calendars <button className="icon-btn-small">+</button></div>
          <label style={{ display: "block", marginTop: 8, fontSize: 12 }}><input type="checkbox" defaultChecked /> Holidays in India</label>
        </div>
      </div>

      <small style={{ display: "block", marginTop: 18, color: "#9aa0a6" }}>Terms • Privacy</small>
    </aside>
  );
}