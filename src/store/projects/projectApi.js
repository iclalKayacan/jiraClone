import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base URL'i düzeltelim - /Projects sonunda olmamalı
const BASE_URL = "https://localhost:44337/api";

// Axios instance'ı düzeltelim
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor aynı kalabilir
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Endpoint'leri düzeltelim
export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async () => {
    const response = await api.get("/Projects");
    return response.data;
  }
);

// my-projects endpoint'ini düzeltelim
export const fetchMyProjects = createAsyncThunk(
  "projects/fetchMyProjects",
  async () => {
    try {
      const response = await api.get("/Projects/my-projects");
      console.log("My Projects Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching my projects:", error.response || error);
      throw error;
    }
  }
);

// Diğer endpoint'leri de düzeltelim
export const createProject = createAsyncThunk(
  "projects/createProject",
  async (projectData) => {
    const response = await api.post("/Projects", projectData);
    return response.data;
  }
);

export const fetchProjectById = createAsyncThunk(
  "projects/fetchProjectById",
  async (projectId) => {
    try {
      const response = await api.get(`/Projects/${projectId}`);
      console.log("Project Detail Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching project:", error.response || error);
      throw error;
    }
  }
);
