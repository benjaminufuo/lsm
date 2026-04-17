import axios from "axios";
import { store } from "../../../global/store";

const baseURL = import.meta.env.VITE_BASE_URL;

if (!baseURL) {
  throw new Error("VITE_BASE_URL is not defined");
}

export const adminApi = axios.create({
  baseURL,
});

adminApi.interceptors.request.use((config) => {
  const token = store.getState().learnFlow.userToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
