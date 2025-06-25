import api from "./api.jsx";

export const getAllHistory = async () => {
    const response = await api.get('/api/history');
    return response.data;
}
