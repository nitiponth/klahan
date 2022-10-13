import axios from 'axios';
import { BASE_URL } from '../utils/config';

export const axiosInstance = (() => {
  const instance = axios.create({
    baseURL: BASE_URL,
  });
  instance.interceptors.request.use((config) => {
    return config;
  });
  return instance;
})();
