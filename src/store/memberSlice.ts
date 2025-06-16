import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Member {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  createdAt: string;
  updatedAt: string;
}

export const fetchMembers = createAsyncThunk(
  "member/fetchMembers",
  async () => {
    const res = await axios.get("https://api.pasuseva.thundergits.com/api/users");
    return res.data.data as Member[];
  }
);
export const addMembers = createAsyncThunk(
  "member/addMembers",
  async (data: Partial<Member>) => {
    const res = await axios.post("https://api.pasuseva.thundergits.com/api/users", data);
    return res.data.data as Member;
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
      })
      .addCase(addMembers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addMembers.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(addMembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching members";
      });
  },
});

export default memberSlice.reducer;