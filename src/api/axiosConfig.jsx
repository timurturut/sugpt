import axios from "axios";
import {useAuth} from "../components/Auth";

const api = axios.create({
    baseURL: "http://localhost:5000/",
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("user"); // Fetch token from localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;