import axios, {type InternalAxiosRequestConfig} from 'axios';

const TOKEN_CYBERSOFT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA5MCIsIkhldEhhblN0cmluZyI6IjI5LzA1LzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc4MDAxMjgwMDAwMCIsIm5iZiI6MTc1MzAzMDgwMCwiZXhwIjoxNzgwMTYwNDAwfQ.KkGRtLpEsgoM4M_TapjOZIzvAwbay3QvXIwwN8XUqWk"

export const apiConfig = axios.create({
    baseURL: 'https://fiverrnew.cybersoft.edu.vn/api/',
})

apiConfig.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const user = localStorage.getItem("USER_LOGIN")

    const accessToken = user ? JSON.parse(user).accessToken : "";

    config.headers.Authorization = `Bearer ${accessToken}`;
    config.headers.TokenCybersoft = TOKEN_CYBERSOFT;

    return config;

})

