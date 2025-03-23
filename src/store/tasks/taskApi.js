import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/TaskItem";

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async () => {
    // Geçici mock data
    return [
      {
        id: "task-1",
        title: "Mobil App Öğrenimi",
        date: "30 MAR",
        label: "FS-2",
        columnId: "col-1",
      },
      {
        id: "task-2",
        title: "Full-Stack ilk proje",
        date: "23 MAR",
        label: "FS-1",
        progress: "0/4",
        columnId: "col-2",
      },
    ];

    // Backend hazır olduğunda:
    // const response = await axios.get(BASE_URL);
    // return response.data;
  }
);

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (taskData) => {
    const response = await axios.post(BASE_URL, taskData);
    return response.data;
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, data }) => {
    const response = await axios.put(`${BASE_URL}/${id}`, data);
    return response.data;
  }
);

export const deleteTask = createAsyncThunk("tasks/deleteTask", async (id) => {
  await axios.delete(`${BASE_URL}/${id}`);
  return id;
});
