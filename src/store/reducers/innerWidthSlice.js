import { createSlice } from "@reduxjs/toolkit";

export const innerWidthSlice = createSlice({
  name: "innerWidth",
  initialState: null,
  reducers: {
    setInnerWidth(state, action) {
      return (state = action.payload);
    },
  },
});

const { actions, reducer } = innerWidthSlice;

export const { setInnerWidth } = actions;

export default reducer;
