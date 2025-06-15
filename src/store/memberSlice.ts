import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Member {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export const fetchMembers = createAsyncThunk(
  "member/fetchMembers",
  async () => {
    const res = await axios.get("https://test-api.pasuseva.thundergits.com/api/users");
    return res.data.data as Member[];
  }
);

const memberSlice = createSlice({
  name: "member",
  initialState: {
    list: [] as Member[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMembers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMembers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchMembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching members";
      });
  },
});

export default memberSlice.reducer;