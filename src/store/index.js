import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { categoriesApi, catalogApi } from "../api";
import search from "./reducers/searchSlice";
import innerWidth from "./reducers/innerWidthSlice";
import { setupListeners } from "@reduxjs/toolkit/query";

const rootReducer = combineReducers({
  [categoriesApi.reducerPath]: categoriesApi.reducer,
  [catalogApi.reducerPath]: catalogApi.reducer,
  search,
  innerWidth,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(categoriesApi.middleware)
      .concat(catalogApi.middleware),
});

setupListeners(store.dispatch);
