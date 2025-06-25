import api from "./api.jsx";

export const getCalendar = async () => {
    const response = await api.get("/api/calendar");
    return response.data;
};

export const saveEvent = async (event) => {
    const response = await api.post("/api/calendar", event);
    return response.data;
};

export const deleteEvent = async (id) => {
    const response = await api.delete(`/api/calendar/${id}`);
    return response.data;
};

export const updateEvent = async (id, event) => {
    const response = await api.put(`/api/calendar/${id}`, event);
    return response.data;
};

export const getEventById = async (id) => {
    const response = await api.get(`/api/calendar/${id}`);
    return response.data;
};
