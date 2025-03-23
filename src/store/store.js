import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "./projects/projectSlice";
import columnsReducer from "./columns/columnSlice";

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    columns: columnsReducer,
    // tasks, subtasks, users eklenecek
  },
});
