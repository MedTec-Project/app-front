import axios from 'axios';

// 2 - Adicionar Axios e criar uma instância do Axios
const api = axios.create({
  baseURL: 'https://app-back-ye0w.onrender.com/',
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
