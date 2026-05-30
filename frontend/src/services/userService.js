import API from '../api/axios';

// services/userService.js

export const getUserById = async (id) => {
    const response = await API.get(`/users/${id}`);
    return response.data;
};