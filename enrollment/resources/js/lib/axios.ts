import axios from "axios";
import { toastService } from "./toats";

export const api = axios.create({
    baseURL: import.meta.env.API_BASE_URl,
    withCredentials: true 
});

api.interceptors.request.use(
    (response) => {
        return response;
    },

    (error) => {
        const message = error?.response?.data?.message || "Something went wrong"

        toastService.error(error);
        return Promise.reject(message);
    }
)