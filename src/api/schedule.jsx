import api from './api';

export const saveSchedule = async (schedule) => {
    const response = await api.post('/api/schedule', schedule);
    return response.data;
};

export const getSchedules = async () => {
    const apiUrl = `/api/schedule`;
    const response = await api.get(apiUrl);
    return response.data;
};

export const getSchedule = async (oid) => {
    const apiUrl = `/api/schedule/${oid}`;
    const response = await api.get(apiUrl);
    return response.data;
};
