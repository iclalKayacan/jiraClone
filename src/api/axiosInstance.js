// @/api/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://localhost:44337/api",
});

// Her istekten önce JWT token ekleyelim
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
