import axios from "axios";
import useAuth from "../hooks/auth/useAuth";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
    (config) => {
        const token = useAuth.getState().token;
        if(token) {
            config.headers.Authorization = `Bearer ${token}`;
        }    
        return config;
    },
    (err) => Promise.reject(err)
)


export default api;