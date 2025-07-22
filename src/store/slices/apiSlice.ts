import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../index";
import type { UseGetOptions, UsePostOptions } from "../../consts/types";
import type { ApiState } from "../../consts/types";

export const fetchData = createAsyncThunk(
  "api/fetchData",
  async (options: UseGetOptions, { rejectWithValue }) => {
    const base = import.meta.env.VITE_USE_MOCK === "true"
      ? import.meta.env.VITE_MOCK_URL
      : import.meta.env.VITE_BASE_URL;

    try {
      const res = await fetch(base + options.url, {
        method: "GET",
        headers: options.headers || {},
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      return await res.json();
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const postData = createAsyncThunk<
  unknown,
  UsePostOptions<unknown>,
  { rejectValue: string }
>(
  "api/postData",
  async (options, { rejectWithValue }) => {
    const base = import.meta.env.VITE_USE_MOCK === "true"
      ? import.meta.env.VITE_MOCK_URL
      : import.meta.env.VITE_BASE_URL;

    try {
      const res = await fetch(base + options.url, {
        method: "POST",
        headers: {
          ...(options.headers || {}),
          ...(options.headers?.["Content-Type"]
            ? {}
            : { "Content-Type": "application/json" }),
        },
        body: JSON.stringify(options.body),
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      return await res.json();
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState: ApiState = {};

export const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    reset(state, action: PayloadAction<string>) {
      delete state[action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state, action) => {
        state[action.meta.arg.url] = { loading: true, error: null, data: null };
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state[action.meta.arg.url] = {
          loading: false,
          error: null,
          data: action.payload,
        };
      })
      .addCase(fetchData.rejected, (state, action) => {
        state[action.meta.arg.url] = {
          loading: false,
          error: action.payload as string,
          data: null,
        };
      })
      .addCase(postData.pending, (state, action) => {
        state[action.meta.arg.url] = { loading: true, error: null, data: null };
      })
      .addCase(postData.fulfilled, (state, action) => {
        state[action.meta.arg.url] = {
          loading: false,
          error: null,
          data: action.payload,
        };
      })
      .addCase(postData.rejected, (state, action) => {
        state[action.meta.arg.url] = {
          loading: false,
          error: action.payload || "Unknown error",
          data: null,
        };
      });
  },
});

export const { reset } = apiSlice.actions;
export const selectApiState = (state: RootState, url: string) =>
  state.api[url] || { loading: false, error: null, data: null };
