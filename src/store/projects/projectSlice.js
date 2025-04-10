// projectSlice.js
import { createSlice } from "@reduxjs/toolkit";
import * as projectApi from "./projectApi";

const initialState = {
  list: [],
  myProjects: [],
  selectedProject: null, // detayta tutmak için
  status: "idle",
  error: null,
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {}, // Bu örnekte henüz basit reducer yok
  extraReducers: (builder) => {
    // 1) fetchProjects
    builder
      .addCase(projectApi.fetchProjects.pending, (state) => {
        state.status = "loading";
      })
      .addCase(projectApi.fetchProjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(projectApi.fetchProjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    // 2) fetchMyProjects
    builder
      .addCase(projectApi.fetchMyProjects.pending, (state) => {
        state.status = "loading";
      })
      .addCase(projectApi.fetchMyProjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.myProjects = action.payload;
      })
      .addCase(projectApi.fetchMyProjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    // 3) createProject
    builder.addCase(projectApi.createProject.fulfilled, (state, action) => {
      state.list.push(action.payload);
      state.myProjects.push(action.payload);
    });

    // 4) fetchProjectById
    builder
      .addCase(projectApi.fetchProjectById.pending, (state) => {
        state.status = "loading";
      })

      .addCase(projectApi.fetchProjectById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedProject = action.payload; // Kolonlar burada gelirse ekrana yansır
      })
      .addCase(projectApi.fetchProjectById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default projectSlice.reducer;
