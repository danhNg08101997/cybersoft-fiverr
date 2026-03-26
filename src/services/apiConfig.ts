import axios, { type InternalAxiosRequestConfig } from "axios";
import { env } from "@config/env";
import { clearStoredUser, getAccessToken } from "@utils/storage";

export const apiConfig = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 15000,
});

apiConfig.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = getAccessToken();

    config.headers = config.headers ?? {};
    config.headers.TokenCybersoft = env.cybersoftToken;

    if (accessToken) {
      config.headers.token = accessToken;
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

apiConfig.interceptors.response.use(
  (response) => response,
  (error) => {
    const statusCode = error?.response?.status;

    if (statusCode === 401) {
      clearStoredUser();
    }

    return Promise.reject(error);
  },
);
