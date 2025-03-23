import { createSlice } from "@reduxjs/toolkit";
import {
  fetchColumns,
  createColumn,
  updateColumn,
  deleteColumn,
} from "./columnApi";

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
      .addCase(fetchColumns.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchColumns.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload; // sadece kolonlar geliyor
      })
      .addCase(fetchColumns.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createColumn.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateColumn.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (col) => col.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteColumn.fulfilled, (state, action) => {
        state.items = state.items.filter((col) => col.id !== action.payload);
      });
  },
});

export default columnSlice.reducer;
