import axios from "axios";

const URL = 'https://673a3e44339a4ce44517aa5d.mockapi.io/stock/stockproducts'

export const axiosInstance = axios.create({
    baseURL: URL
})