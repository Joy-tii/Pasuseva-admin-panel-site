import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Customer {
  _id: string;
  fullName: string;
  phone: string;
  email: string;
  address?: string;
  status?: string;
}

interface CustomerState {
  list: Customer[];
  loading: boolean;
  error: string | null;
}

const initialState: CustomerState = {
  list: [],
  loading: false,
  error: null,
};

export const fetchCustomers = createAsyncThunk(
  "customer/fetchCustomers",
  async () => {
    const res = await axios.get("https://test-api.pasuseva.thundergits.com/api/customer");
    return res.data.data as Customer[];
  }
);

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching customers";
      });
  },
});

export default customerSlice.reducer;