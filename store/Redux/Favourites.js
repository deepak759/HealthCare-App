import { createSlice } from "@reduxjs/toolkit";

const ExpendiatureSlice = createSlice({
  name: "User",
  initialState: {
    token: "",
    isAuthenticated: false,
  },
  reducers: {
    authenticate: (state, action) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.token = "";
      state.isAuthenticated = false;
    },
  },
});
export const { authenticate, logout } = ExpendiatureSlice.actions;

export default ExpendiatureSlice.reducer;
