import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface DropdownState {
  openId: string | null;
}

const initialState: DropdownState = {
  openId: null,
};

const dropdownSlice = createSlice({
  name: "dropdown",
  initialState,
  reducers: {
    openDropdown(state, action: PayloadAction<string>) {
      state.openId = action.payload;
    },
    closeDropdown(state) {
      state.openId = null;
    },
    toggleDropdown(state, action: PayloadAction<string>) {
      state.openId =
        state.openId === action.payload ? null : action.payload;
    },
  },
});

export const {
  openDropdown,
  closeDropdown,
  toggleDropdown,
} = dropdownSlice.actions;
export default dropdownSlice.reducer;
