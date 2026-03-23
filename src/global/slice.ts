import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {}

const initialState: CounterState = {};

export const slice = createSlice({
  name: "learnFlow",
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
export const {} = slice.actions;

export default slice.reducer;
