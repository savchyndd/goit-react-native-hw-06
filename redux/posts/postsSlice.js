import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  comment: '',
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    addComment: (state, { payload }) => ({
      comment: payload,
    }),
  },
});

export const { addComment } = postSlice.actions;
