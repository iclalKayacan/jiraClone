import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://localhost:44337/api";

// GET: Projeye ait kolonları getir
export const fetchColumns = createAsyncThunk(
  "columns/fetchColumns",
  async (projectId) => {
    const response = await axios.get(`${BASE_URL}/projects/${projectId}`);
    return response.data.columns;
  }
);

// POST: Yeni kolon oluştur
export const createColumn = createAsyncThunk(
  "columns/createColumn",
  async ({ projectId, ...data }) => {
    const response = await axios.post(`${BASE_URL}/Column`, {
      title: data.title,
      projectId: projectId,
    });
    return response.data;
  }
);

// PUT: Kolon başlığını güncelle
export const updateColumnTitle = createAsyncThunk(
  "columns/updateColumnTitle",
  async ({ id, title }) => {
    const currentColumn = await axios.get(`${BASE_URL}/Column/${id}`);

    const response = await axios.put(`${BASE_URL}/Column/${id}`, {
      ...currentColumn.data,
      title: title,
    });

    return {
      ...currentColumn.data,
      title: title,
    };
  }
);

// DELETE: Kolonu sil
export const deleteColumn = createAsyncThunk(
  "columns/deleteColumn",
  async (id) => {
    await axios.delete(`${BASE_URL}/Column/${id}`);
    return id;
  }
);

const columnSlice = createSlice({
  name: "columns",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchColumns.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchColumns.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.map((column) => ({
          ...column,
          tasks: column.tasks || [], // Ensure tasks are included and default to an empty array if missing
        }));
      })
      .addCase(fetchColumns.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // CREATE
      .addCase(createColumn.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      // UPDATE TITLE
      .addCase(updateColumnTitle.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.items.findIndex((col) => col.id === updated.id);
        if (index !== -1) {
          // Mevcut kolonun tasks array'ini koru
          state.items[index] = {
            ...updated,
            tasks: state.items[index].tasks || [], // Preserve tasks
          };
        }
      })

      // DELETE
      .addCase(deleteColumn.fulfilled, (state, action) => {
        state.items = state.items.filter((col) => col.id !== action.payload);
      });
  },
});

export default columnSlice.reducer;
