import type { AxiosRequestConfig } from 'axios';
import { axiosInstance } from './axios.instance';

export const apiClient = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    axiosInstance.get<T>(url, config).then((response) => response.data),
  post: <TResponse, TBody>(url: string, body: TBody, config?: AxiosRequestConfig) =>
    axiosInstance.post<TResponse>(url, body, config).then((response) => response.data),
};
