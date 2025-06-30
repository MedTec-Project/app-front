import api from './api';

export const saveComorbidity = async (comorbidity) => {
    const response = await api.post('/api/comorbidity', comorbidity);
    return response.data;
};

export const getComorbidity = async () => {
    const apiUrl = `/api/comorbidity`;
    const response = await api.get(apiUrl);
    return response.data;
};

export const updateComorbidity = async (id, comorbidity) => {
    const response = await api.put(`/api/comorbidity/${id}`, comorbidity);
    return response.data;
};

export const deleteComorbidity = async (id) => {
    return api.delete(`/api/comorbidity/${id}`);
};

export const getComorbidityTypes = async () => {
    const response = await api.get('/api/comorbidity/types');
    return response.data;
};