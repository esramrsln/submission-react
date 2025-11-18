import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../api/client";

export const fetchThreads = createAsyncThunk(
  "threads/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await client.get("/threads");
      return res.data.data.threads;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const createThread = createAsyncThunk(
  "threads/create",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await client.post("/threads", payload);
      return res.data.data.thread;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const threadsSlice = createSlice({
  name: "threads",
  initialState: { items: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchThreads.pending, (state) => {
      state.status = "loading";
    })
      .addCase(fetchThreads.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchThreads.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createThread.fulfilled, (state, action) => {
        // prepend baru supaya terlihat di atas
        state.items.unshift(action.payload);
      });
  },
});

export default threadsSlice.reducer;
