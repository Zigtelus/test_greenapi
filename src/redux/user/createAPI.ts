import axios, { AxiosInstance } from "axios";

const BASE_URL = 'https://api.green-api.com/';
const REQUEST_TIMEOUT = 2000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  })

  return api;
};