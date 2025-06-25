import api from "./api";

export const saveAppointment = async (appointment) => {
    const response = await api.post('/api/appointment', appointment);
    return response.data;
};

export const getAppointmentById = async (id) => {
    const response = await api.get(`/api/appointment/${id}`);
    return response.data;
};

export const deleteAppointment = async (id) => {
    const response = await api.delete(`/api/appointment/${id}`);
    return response.data;
};

export const updateAppointment = async (id, appointment) => {
    const response = await api.put(`/api/appointment/${id}`, appointment);
    return response.data;
};

export const getTodayAppointments = async () => {
    const response = await api.get('/api/appointment/today');
    return response.data;
};

export const getAllAppointments = async () => {
    const response = await api.get('/api/appointment');
    return response.data;
}

export const markAppointmentDone = async (id, done) => {
    const response = await api.put(`/api/appointment/${id}/mark`, { done });
    return response.data;
}
