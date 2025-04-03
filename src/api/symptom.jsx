import api from './api';

export const getSymptoms = async () => {
  const response = await api.get('/api/symptom');
  return response.data;
};