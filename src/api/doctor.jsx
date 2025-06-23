import api from './api';

export const getDoctors = async () => {
    const response = await api.get('/api/doctor');
    return response.data;
};
