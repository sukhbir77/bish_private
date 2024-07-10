import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    role: null,
    isOnboarded: false,
    isFirstTime: true,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setOnboarded: (state, action) => {
      state.isOnboarded = action.payload;
    },
    setFirstTime: (state, action) => {
      state.isFirstTime = action.payload;
    },
    resetState: (state) => {
      state.user = null;
      state.role = null;
      state.isOnboarded = false;
      state.isFirstTime = true;
    },
  },
});

export const {
  setUser,
  clearUser,
  setRole,
  setOnboarded,
  setFirstTime,
  resetState,
} = userSlice.actions;

// Selectors
export const selectUser = (state) => state.user.user;
export const selectRole = (state) => state.user.role;
export const selectIsOnboarded = (state) => state.user.isOnboarded;
export const selectFirstTime = (state) => state.user.isFirstTime;

export default userSlice.reducer;
