import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface UserDetails {
  fullName?: string;
  fatherName?: string;
  dob?: string;
  phone?: string;
  email?: string;
  address?: string;
  state?: string;
  district?: string;
  block?: string;
  education?: string;
  percentage?: string;
  passYear?: string;
  aadhaar?: string;
  photo?: string | null;
  aadhaarFront?: string | null;
  aadhaarBack?: string | null;
  landDocs?: string | null;
}

export interface PaymentItem {
  userDetails: UserDetails;
  _id: string;
  razorpay_order_id: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  razorpay_payment_id?: string;
  razorpay_signature?: string;
}

export interface PaymentState {
  data: PaymentItem[];
  loading: boolean;
  error: string | null;
}

export const fetchPayments = createAsyncThunk(
  "payments/fetchPayments",
  async () => {
    const res = await axios.get("https://test-api.pasuseva.thundergits.com/api/payment");
    return res.data.data as PaymentItem[];
  }
);

const initialState: PaymentState = {
  data: [],
  loading: false,
  error: null,
};

const paymentSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching payments";
      });
  },
});

export default paymentSlice.reducer;