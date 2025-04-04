import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://localhost:44337/api/Projects";

// Axios instance oluşturalım
const api = axios.create({
  baseURL: BASE_URL,
});

// Request interceptor ekleyelim
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // veya state'den token'ı alın
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Tüm projeleri getir
export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async () => {
    const response = await api.get("");
    return response.data;
  }
);

// Kullanıcının projelerini getir
export const fetchMyProjects = createAsyncThunk(
  "projects/fetchMyProjects",
  async () => {
    const response = await api.get("/my-projects");
    return response.data;
  }
);

// Yeni proje oluştur
export const createProject = createAsyncThunk(
  "projects/createProject",
  async (projectData) => {
    const response = await api.post("", projectData);
    return response.data;
  }
);
