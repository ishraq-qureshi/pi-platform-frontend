import { configureStore } from '@reduxjs/toolkit';
import authReducer from "@/redux/slices/auth/auth.slice";
import { authApi } from './api/auth/auth.api';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;