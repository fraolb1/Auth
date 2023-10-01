import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feature/authSlice";
import { apiSlice } from "../feature/apiSlice";

const store = configureStore({
  reducer: {
    user: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;