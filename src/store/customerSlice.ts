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
  selectedCustomer: Customer | null;
  loading: boolean;
  error: string | null;
}

const initialState: CustomerState = {
  list: [],
  selectedCustomer: null,
  loading: false,
  error: null,
};

export const fetchCustomers = createAsyncThunk(
  "customer/fetchCustomers",
  async () => {
    const res = await axios.get("http://localhost:4013/api/customer");
    return res.data.data as Customer[];
  }
);

export const getCustomerById = createAsyncThunk(
  "customer/getCustomerById",
  async (id: string) => {
    const res = await axios.get(`http://localhost:4013/api/customer/${id}`);
    return res.data.data as Customer;
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
      }).addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching customers";
      })
      .addCase(getCustomerById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCustomerById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCustomer = action.payload;
      })
      .addCase(getCustomerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching customer details";
      });
  },
});

export default customerSlice.reducer;