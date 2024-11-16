import axios from "axios";

const URL = ' '

export const axiosInstance = axios.create({
    baseURL: URL
})