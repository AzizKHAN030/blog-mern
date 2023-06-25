/* eslint-disable no-param-reassign */
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:4444',
});

instance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});

export default instance;
