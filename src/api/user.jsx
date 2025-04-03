import api from './api';

export const getUsers = async () => {
 
};

export const getAllUsers = async () => {
 
}

export const getContext = async () => {
  const response = await api.get(`/api/v1/user/context`);
  return response.data;
};

export const createUser = async (user) => {
  const response = await api.post('/api/register', user);
  return response;
};

export const updateUser = async (id, user) => {
  const response = await api.put(`/api/v1/user/${id}`, user);
  return response.data;
};

export const deleteUser = async (id) => {
  return api.delete(`/api/v1/user/${id}`);
};

export const loginUser = async (email, password) => {
  const body = { email, password };
  const response = await api.post('/api/login', body)
  return response;
};