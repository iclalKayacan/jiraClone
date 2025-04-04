import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./projects/projectSlice";
import taskReducer from "./tasks/taskSlice";
import columnReducer from "./columns/columnSlice";
import userReducer from "./user/userSlice";

export const store = configureStore({
  reducer: {
    projects: projectReducer,
    tasks: taskReducer,
    columns: columnReducer,
    user: userReducer,
  },
});
