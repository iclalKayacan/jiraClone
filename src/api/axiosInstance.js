import axios from "axios";
import store from "../store/store";

const axiosInstance = axios.create({
  baseURL: "https://localhost:44337/api",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().user.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
