import axios from "axios";

const LOCALHOST = 'http://localhost:7070';

export const API_BASE_URL = LOCALHOST;

const api = axios.create({
    baseURL: API_BASE_URL,
});

// ✅ Request Interceptor: Add Authorization token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('jwt');
    if (token && !config.url.includes('/api/otp/')) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// ✅ Response Interceptor: Handle 401/403 errors globally
// api.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         const status = error.response?.status;
//         if (status === 401 || status === 403) {
//             window.location.href = '/unauthorized';
//         }
//         return Promise.reject(error);
//     }
// );

export default api;
