import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://localhost:44337/api/Project";

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
  }
);

export const createProject = createAsyncThunk(
  "projects/createProject",
  async (projectData) => {
    const response = await axios.post(BASE_URL, projectData);
    return response.data;
  }
);

// Diğer API fonksiyonları...
