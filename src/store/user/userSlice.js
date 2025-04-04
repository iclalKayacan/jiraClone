import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
  userInfo: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload.token;
      state.userInfo = action.payload.user;
    },
    logout: (state) => {
      state.token = null;
      state.userInfo = null;
      localStorage.removeItem("token");
    },
  },
});

export const { setCredentials, logout } = userSlice.actions;
export default userSlice.reducer;
