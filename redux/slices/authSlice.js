import { createSlice } from "@reduxjs/toolkit";

const state = {
   userId: null,
   nickName: null,
   isAuth: false,
};

export const authSlice = createSlice({
   name: "auth",
   initialState: state,
   reducers: {
      updateUserProfile: (state, { payload }) => ({
         ...state,
         userId: payload.userId,
         nickName: payload.nickName,
         isAuth: payload.isAuth,
      }),
      authStateChange: (state, { payload }) => ({ ...state, isAuth: payload.isAuth }),
      authSingOut: () => state,
   },
});

export const { loginAuth, logoutAuth } = authSlice.actions;
export default authSlice.reducer;
