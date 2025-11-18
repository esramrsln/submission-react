import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../api/client";

export const fetchUsers = createAsyncThunk(
  "users/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await client.get("/users");
      return res.data.data.users;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: { items: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchUsers.pending, (state) => {
      state.status = "loading";
    })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default usersSlice.reducer;
