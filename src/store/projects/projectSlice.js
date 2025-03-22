import { createSlice } from "@reduxjs/toolkit";
import { fetchProjects, createProject } from "./projectApi";

const projectsSlice = createSlice({
  name: "projects",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.list.push(action.payload);
      });
  },
});

export default projectsSlice.reducer;
