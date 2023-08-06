import { createSlice } from "@reduxjs/toolkit";

const state = { isAuth: false };

export const authSlice = createSlice({
   name: "auth",
   initialState: state,
   reducers: {
      loginAuth: (state) => {
         state.isAuth = true;
      },
      logoutAuth: (state) => {
         state.isAuth = false;
      },
   },
});

export const { loginAuth, logoutAuth } = authSlice.actions;
export default authSlice.reducer;
