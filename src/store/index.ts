import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import dropdownReducer from "./slices/dropDownSlice";

export const store = configureStore({
  reducer: {
    api: apiSlice.reducer,
    dropdown: dropdownReducer,
  },
});

export type RootState  = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
