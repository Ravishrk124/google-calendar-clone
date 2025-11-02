import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";
const api = axios.create({ baseURL: API_URL });
export const getEvents = () => api.get("/events");
export const createEvent = (data) => api.post("/events", data);
export const updateEvent = (id, data) => api.put(`/events/${id}`, data);
export const deleteEvent = (id) => api.delete(`/events/${id}`);