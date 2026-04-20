import axios, {type InternalAxiosRequestConfig} from "axios";
import {env} from "@config/env";
import {getAccessToken} from "@utils/storage";

export const apiConfig = axios.create({
  baseURL: env.apiBaseUrl,
  // timeout: 15000,
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
  async (error) => {
    const statusCode = error?.response?.status;
    const originalRequest = error.config;

    if (statusCode === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = localStorage.getItem('refreshToken');

        if (!refreshToken) {
            localStorage.clear();
            // window.location.href = '/sign-in';
            window.location.href = '/signin';
            return Promise.reject(error);
        }

        try {
            const res = await axios.post(
                `${env.apiBaseUrl}/auth/refresh`,
                {
                    refreshToken,
                }
            );

            const newAccessToken = res.data.content.tokens.accessToken;
            const newRefreshToken = res.data.content.tokens.refreshToken;

            localStorage.setItem('accessToken', newAccessToken);
            localStorage.setItem('refreshToken', newRefreshToken);

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            return apiConfig(originalRequest);

        }catch (refreshError){
            localStorage.clear();
            // window.location.href = '/sign-in';
            window.location.href = '/signin';
            return Promise.reject(refreshError);
        }

    }


    return Promise.reject(error);
  },
);
