import { createSlice } from "@reduxjs/toolkit";

export interface LearnFlowState {
  userToken: "";
  userInfo?: {};
}

const initialState: LearnFlowState = {
  userToken: "",
  userInfo: {},
};

export const slice = createSlice({
  name: "learnFlow",
  initialState,
  reducers: {
    setUserToken: (state, { payload }) => {
      state.userToken = payload;
    },
    setUserInfo: (state, { payload }) => {
      state.userInfo = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserToken, setUserInfo } = slice.actions;

export default slice.reducer;
