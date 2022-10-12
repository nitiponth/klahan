import axios from 'axios';

const LINE_BOT_ENDPOINT = process.env.REACT_APP_LINE_BOT_ENDPOINT;

const CHANNLE_ACCESS_TOKEN = process.env.REACT_APP_CHANNLE_ACCESS_TOKEN;

export const axiosInstance = (() => {
  const instance = axios.create({
    baseURL: LINE_BOT_ENDPOINT,
  });
  instance.interceptors.request.use((config) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    config.headers!.Authorization = `Bearer ${CHANNLE_ACCESS_TOKEN}`;
    return config;
  });
  return instance;
})();
