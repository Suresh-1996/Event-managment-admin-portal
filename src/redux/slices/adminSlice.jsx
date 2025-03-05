import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: { adminInfo: null },
  reducers: {
    loginSuccess: (state, action) => {
      state.adminInfo = action.payload;
    },
    logout: (state) => {
      state.adminInfo = null;
    },
  },
});

export const { loginSuccess, logout } = adminSlice.actions;
export default adminSlice.reducer;
