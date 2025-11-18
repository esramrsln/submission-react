import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../api/client";

export const fetchThreadDetail = createAsyncThunk(
  "threadDetail/fetch",
  async (threadId, { rejectWithValue }) => {
    try {
      const res = await client.get(`/threads/${threadId}`);
      return res.data.data.detailThread;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const createComment = createAsyncThunk(
  "threadDetail/createComment",
  async ({ threadId, content }, { rejectWithValue }) => {
    try {
      const res = await client.post(`/threads/${threadId}/comments`, {
        content,
      });
      return res.data.data.comment;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const threadDetailSlice = createSlice({
  name: "threadDetail",
  initialState: { item: null, status: "idle", error: null },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchThreadDetail.pending, (s) => {
      s.status = "loading";
    })
      .addCase(fetchThreadDetail.fulfilled, (s, a) => {
        s.status = "succeeded";
        s.item = a.payload;
      })
      .addCase(fetchThreadDetail.rejected, (s, a) => {
        s.status = "failed";
        s.error = a.payload;
      })
      .addCase(createComment.fulfilled, (s, a) => {
        if (s.item && s.item.comments) s.item.comments.push(a.payload);
      });
  },
});

export default threadDetailSlice.reducer;
