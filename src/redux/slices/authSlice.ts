import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { App, Credentials } from "realm-web";

type AuthState = {
  authState: boolean;
};

const initialState = {
  authState: false,
  user: null,
} as AuthState;

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action to set the authentication status
    setAuthState(state, action) {
      console.log("setAuthState");
      state.authState = action.payload;
    },
    setUser(state, action) {
      console.log("1")
      console.log(action.payload);
      state.user = action.payload;
    },
  },
});

export const { setAuthState, setUser } = authSlice.actions;

export default authSlice.reducer;
