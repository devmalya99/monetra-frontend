
import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:9100',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Important for cookies
});

// Interceptor for 401 Unauthorized
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid
            // We rely on the store/hooks to handle cleanup or UI updates
            // Avoiding global redirect to allow public page access
            console.warn('Unauthorized access - 401');
        }
        return Promise.reject(error);
    }
);

export default api;
