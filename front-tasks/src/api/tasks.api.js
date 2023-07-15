import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1/tasks/'
});

export const getAllTasks = () => api.get('/');    

export const getTaskById = (id) => api.get(`/${id}/`);

export const createTask = (task) => api.post('/', task);  

export const DeleteTask = (id) => api.delete(`/${id}/`);

export const UpdateTask = (id, task) => api.put(`/${id}/`, task);