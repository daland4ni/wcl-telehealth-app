import API from '../api/axios';

export const register = async (formData) => {
  const response = await API.post('/auth/register', formData);
  return response.data;
};

export const login = async (formData) => {
  const response = await API.post('/auth/login', formData);
  return response.data;
};

export const getProfile = async () => {
  const response = await API.get('/auth/profile');
  return response.data;
};

export const getUserById = async (id) => {
  const response = await API.get(`/users/${id}`);
  return response.data;
}