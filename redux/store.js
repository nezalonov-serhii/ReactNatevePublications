import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSlice";

export const store = configureStore({
   reducer: authSlice.reducer,
});
