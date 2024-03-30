import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
// import { userApi } from "./services/userApi";
import thunk from "redux-thunk";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
  reducer: {
    authReducer,
    // [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({}).concat([userApi.middleware]),
});

// setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
