import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPaymentDetail = createAsyncThunk(
  "paymentDetail/fetchPaymentDetail",
  async (id: string) => {
    const res = await axios.get(`http://localhost:4013/api/payment/${id}`);
    return res.data.data;
  }
);

const paymentDetailSlice = createSlice({
  name: "paymentDetail",
  initialState: {
    data: null as any,
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaymentDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaymentDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPaymentDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching payment detail";
      });
  },
});

export default paymentDetailSlice.reducer;