import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://localhost:44337/api/TaskItem";

// GET: Tüm görevleri getir
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
});

// POST: Yeni görev oluştur
export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (taskData) => {
    const response = await axios.post(BASE_URL, taskData);
    return response.data;
  }
);

// PUT: Görevi tam güncelle (tüm alanlar)
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, data }) => {
    const response = await axios.put(`${BASE_URL}/${id}`, data);
    return response.data;
  }
);

// PATCH: Task açıklamasını güncelle
export const patchTaskDescription = createAsyncThunk(
  "tasks/patchTaskDescription",
  async ({ id, description }) => {
    const url = `${BASE_URL}/${id}/description`;

    await axios.patch(url, JSON.stringify(description), {
      headers: { "Content-Type": "application/json" },
    });

    return { id, description };
  }
);

// DELETE: Görev sil
export const deleteTask = createAsyncThunk("tasks/deleteTask", async (id) => {
  await axios.delete(`${BASE_URL}/${id}`);
  return id;
});

// PATCH: Task kolonunu güncelle (sürükle-bırak için)
export const updateTaskColumn = createAsyncThunk(
  "tasks/updateTaskColumn",
  async ({ taskId, columnId }) => {
    const url = `${BASE_URL}/${taskId}/column`;
    await axios.patch(url, JSON.stringify(columnId), {
      headers: { "Content-Type": "application/json" },
    });
    return { taskId, columnId };
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchTasks
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // createTask
      .addCase(createTask.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // updateTask (tam güncelleme)
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (task) => task.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      // patchTaskDescription (sadece açıklama güncelleme)
      .addCase(patchTaskDescription.fulfilled, (state, action) => {
        const { id, description } = action.payload;
        const task = state.items.find((t) => t.id === id);
        if (task) {
          task.description = description;
        }
      })
      // deleteTask
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter((task) => task.id !== action.payload);
      })
      // updateTaskColumn
      .addCase(updateTaskColumn.fulfilled, (state, action) => {
        const { taskId, columnId } = action.payload;
        const task = state.items.find((t) => t.id === taskId);
        if (task) {
          task.columnId = columnId;
        }
      });
  },
});

export default taskSlice.reducer;
