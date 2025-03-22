import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://localhost:44337/api/projects"; 

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
  }
);

export const createProject = createAsyncThunk(
  "projects/createProject",
  async (project) => {
    const response = await axios.post(BASE_URL, project);
    return response.data;
  }
);
