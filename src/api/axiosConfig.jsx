import axios from "axios";
import {useAuth} from "../components/Auth";

const api = axios.create({
    baseURL: "http://localhost:5000/",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        const { user, loading } = useAuth();
        if (user) {
            config.headers.Authorization = `Bearer ${user}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;