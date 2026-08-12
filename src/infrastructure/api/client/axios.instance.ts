import axios, { type AxiosError } from 'axios';
import { env } from '@/app/config/env';
import { ApiError } from './api-error';

let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

export const getAccessToken = () => accessToken;

export const axiosInstance = axios.create({
  baseURL: env.API_URL,
  timeout: 10_000,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string | string[] }>) => {
    const message = error.response?.data?.message;
    return Promise.reject(
      new ApiError(
        Array.isArray(message) ? message.join(', ') : (message ?? 'No se pudo completar la solicitud.'),
        error.response?.status ?? 0,
      ),
    );
  },
);
