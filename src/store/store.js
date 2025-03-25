import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "./projects/projectSlice";
import columnsReducer from "./columns/columnSlice";
import taskReducer from "./tasks/taskSlice";


export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    columns: columnsReducer,
    tasks: taskReducer,
    // tasks, subtasks, users eklenecek
  },
});
