import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "./projects/projectSlice";

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    // tasks, subtasks, users eklenecek
  },
});
