import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://localhost:44337/api/projects";

export const fetchColumns = createAsyncThunk(
  "columns/fetchColumns",
  async (projectId) => {
    const response = await axios.get(`${BASE_URL}/${projectId}`);
    // Kolonlar proje detayından geliyor, o yüzden response.data.columns
    return response.data.columns;
  }
);

export const createColumn = createAsyncThunk(
  "columns/createColumn",
  async (columnData) => {
    const { projectId, ...data } = columnData;
    const response = await axios.post(`${BASE_URL}/${projectId}/columns`, data);
    return response.data;
  }
);

export const updateColumn = createAsyncThunk(
  "columns/updateColumn",
  async ({ id, data }) => {
    const response = await axios.put(`${BASE_URL}/columns/${id}`, data);
    return response.data;
  }
);

export const deleteColumn = createAsyncThunk(
  "columns/deleteColumn",
  async (id) => {
    await axios.delete(`${BASE_URL}/columns/${id}`);
    return id;
  }
);
