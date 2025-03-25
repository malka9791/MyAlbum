import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
}

const initialState: AuthState = { user: null, token: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signUp: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { signUp, logout } = authSlice.actions;
export default authSlice.reducer;
