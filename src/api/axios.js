import axios from 'axios';

const instance = axios.create({
  // baseURL: 'http://52.66.130.203:5001/api',
  baseURL: 'http://localhost:5001/api',

});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
