import { createSlice } from '@reduxjs/toolkit';

const authInitialState = {
  login: null,
  email: null,
  avatar: null,
  userId: null,
  stateChange: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      login: payload.login,
      userId: payload.userId,
      email: payload.email,
      avatar: payload.avatar,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    authSignOut: () => initialState,
  },
});

export const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions;
// export const authReducer = authSlice.reducer;
