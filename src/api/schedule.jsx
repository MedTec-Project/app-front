import api from './api';

export const saveSchedule = async (schedule) => {
    const response = await api.post('/api/schedule', schedule);
    return response.data;
};

export const getTodaySchedule = async () => {
    const response = await api.get('/api/schedule/today');
    return response.data;
}

export const getGeneralSchedule = async () => {
    const response = await api.get('/api/schedule/general');
    return response.data;
}

export const getScheduleById = async (id) => {
    const response = await api.get(`/api/schedule/${id}`);
    return response.data;
};

export const updateSchedule = async (id, schedule) => {
    const response = await api.put(`/api/schedule/${id}`, schedule);
    return response.data;
};

export const deleteSchedule = async (id) => {
    const response = await api.delete(`/api/schedule/${id}`);
    return response.data;
};

export const markScheduleTaken = async (id, dateTaken) => {
    const response = await api.put(`/api/schedule/${id}/mark`, { dateTaken });
    return response.data;
};