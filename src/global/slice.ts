import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserProps } from "../lib/definition";

export interface LearnFlowState {
  userToken: "";
  userInfo: UserProps | null;
}

const initialState: LearnFlowState = {
  userToken: "",
  userInfo: null,
};

export const slice = createSlice({
  name: "learnFlow",
  initialState,
  reducers: {
    setUserToken: (state, { payload }) => {
      state.userToken = payload;
    },
    setUserInfo: (state, action: PayloadAction<UserProps>) => {
      state.userInfo = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserToken, setUserInfo } = slice.actions;

export default slice.reducer;
