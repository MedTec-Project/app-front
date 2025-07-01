import api from './api';

export const getDoctors = async () => {
    const response = await api.get('/api/doctor');
    return response.data;
};

export const getDoctor = async (oid) => {
    const response = await api.get(`/api/doctor/${oid}`);
    return response.data;
};

export const saveDoctor = async (doctor) => {
    const response = await api.post('/api/doctor', doctor);
    return response.data;
};

export const updateDoctor = async (oid, doctor) => {
    const response = await api.put(`/api/doctor/${oid}`, doctor);
    return response.data;
};

export const deleteDoctor = async (oid) => {
    const response = await api.delete(`/api/doctor/${oid}`);
    return response.data;
};
