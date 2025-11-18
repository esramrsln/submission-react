import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk untuk fetch leaderboard
export const fetchLeaderboards = createAsyncThunk(
  "leaderboard/fetchLeaderboards",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        "https://forum-api.dicoding.dev/v1/leaderboards"
      );
      return res.data.data.leaderboards;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaderboards.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLeaderboards.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchLeaderboards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default leaderboardSlice.reducer;
