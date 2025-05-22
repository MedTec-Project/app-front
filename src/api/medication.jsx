import api from './api';

export const saveMedication = async (medicine) => {
  const response = await api.post('/api/medicine', medicine);
  return response.data;
};

export const getMedicines = async (name, oidManufacturer, medicineCategory) => {
  const apiUrl = `/api/medicine`;
  const response = await api.get(apiUrl);
  return response.data;
};

export const getMedication = async (oid) => {
  const apiUrl = `/api/medicine/${oid}`;
  const response = await api.get(apiUrl);
  return response.data;
};