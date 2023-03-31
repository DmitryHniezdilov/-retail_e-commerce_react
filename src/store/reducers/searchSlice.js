import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "searchValue",
  initialState: "",
  reducers: {
    updateSearch(state, action) {
      return (state = action.payload);
    },
    resetSearch(state, action) {
      return (state = "");
    },
  },
});

const { actions, reducer } = searchSlice;

export const { updateSearch, resetSearch } = actions;

export default reducer;
