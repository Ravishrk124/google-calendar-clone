import React, { useEffect, useRef, useState } from "react";

const toInputValue = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  const tzOffset = d.getTimezoneOffset() * 60000;
  const local = new Date(d.getTime() - tzOffset);
  return local.toISOString().slice(0, 16);
};

const isoFromInput = (inputValue) => {
  if (!inputValue) return null;
  const local = new Date(inputValue);
  if (Number.isNaN(local.getTime())) return null;
  return new Date(local.getTime()).toISOString();
};

export default function EventModal({ event, slot, events = [], onClose, onSave, onDelete }) {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [error, setError] = useState("");
  const isEditing = !!event;
  const firstInputRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      setTitle(event.title || "");
      setStart(toInputValue(event.start));
      setEnd(toInputValue(event.end));
    } else if (slot) {
      setTitle("");
      setStart(toInputValue(slot.start));
      setEnd(toInputValue(slot.end || new Date(new Date(slot.start).getTime() + 60 * 60 * 1000).toISOString()));
    } else {
      const now = new Date();
      const plusHour = new Date(now.getTime() + 60 * 60 * 1000);
      setTitle("");
      setStart(toInputValue(now.toISOString()));
      setEnd(toInputValue(plusHour.toISOString()));
    }
    setError("");
    setTimeout(() => firstInputRef.current && firstInputRef.current.focus(), 0);
  }, [event, slot]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose && onClose();
      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleSubmit(e);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [title, start, end, events, event]);

  const parseISOToDate = (iso) => (iso ? new Date(iso) : null);

  const conflictWith = (sIso, eIso) => {
    const s = parseISOToDate(sIso);
    const e = parseISOToDate(eIso);
    if (!s || !e) return null;
    for (const ev of events) {
      if (isEditing && ev.id === (event && event.id)) continue;
      const a = parseISOToDate(ev.start);
      const b = parseISOToDate(ev.end);
      if (!a || !b) continue;
      if (s < b && e > a) return ev;
    }
    return null;
  };

  const handleSubmit = (e) => {
    e && e.preventDefault();
    setError("");
    if (!title.trim()) {
      setError("Please enter a title");
      return;
    }
    const sIso = isoFromInput(start);
    const eIso = isoFromInput(end);
    if (!sIso || !eIso) {
      setError("Invalid start or end");
      return;
    }
    if (new Date(eIso) <= new Date(sIso)) {
      setError("End must be after start");
      return;
    }
    const conflict = conflictWith(sIso, eIso);
    if (conflict) {
      const ok = window.confirm(`This overlaps with "${conflict.title}". Continue and save anyway?`);
      if (!ok) return;
    }
    const payload = {
      id: isEditing ? event.id : undefined,
      title: title.trim(),
      start: sIso,
      end: eIso,
      color: event?.color || "#1a73e8",
    };
    onSave && onSave(payload);
  };

  const handleDelete = () => {
    if (!isEditing) return;
    if (window.confirm("Delete this event?")) {
      onDelete && onDelete(event.id);
    }
  };

  return (
    <div
      className="modal-backdrop"
      onClick={() => onClose && onClose()}
      role="presentation"
    >
      <div onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" style={{ width: "100%", maxWidth: 540, background: "#fff", borderRadius: 12, boxShadow: "0 8px 30px rgba(0,0,0,0.25)", padding: 18 }}>
        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div style={{ fontSize: 18, fontWeight: 600 }}>{isEditing ? "Edit Event" : "Create Event"}</div>
            {isEditing ? (
              <button type="button" onClick={handleDelete} style={{ background: "#ef4444", color: "#fff", border: "none", padding: "6px 10px", borderRadius: 8, cursor: "pointer" }}>Delete</button>
            ) : null}
          </div>

          {error ? <div style={{ color: "#b91c1c", marginBottom: 10, fontWeight: 600 }}>{error}</div> : null}

          <div style={{ marginBottom: 10 }}>
            <label style={{ display: "block", marginBottom: 6, fontSize: 14 }}>Title</label>
            <input ref={firstInputRef} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Event title" style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #e5e7eb", outline: "none", fontSize: 14 }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 6 }}>
            <div>
              <label style={{ display: "block", marginBottom: 6, fontSize: 14 }}>Start</label>
              <input type="datetime-local" value={start} onChange={(e) => setStart(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #e5e7eb", outline: "none", fontSize: 14 }} />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: 6, fontSize: 14 }}>End</label>
              <input type="datetime-local" value={end} onChange={(e) => setEnd(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #e5e7eb", outline: "none", fontSize: 14 }} />
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 12 }}>
            <button type="button" onClick={() => onClose && onClose()} style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #d1d5db", background: "#fff", cursor: "pointer", minWidth: 88 }}>Cancel</button>
            <button type="submit" style={{ padding: "8px 12px", borderRadius: 8, border: "none", background: "#1a73e8", color: "#fff", cursor: "pointer", minWidth: 88 }}>Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}