import axios, { AxiosInstance } from "axios";

const fetcher: AxiosInstance = axios.create(
    {
        withCredentials: true,
        baseURL: import.meta.env.VITE_API_BASE_URL
    }
);


export default fetcher;