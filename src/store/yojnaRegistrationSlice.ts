import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface YojnaRegistrationItem {
  _id: string;
  yojna: string;
  status: string;
  fullName: string;
  fatherName: string;
  dob: string;
  phone: string;
  email: string;
  address: string;
  state: string;
  district: string;
  block: string;
  education: string;
  percentage: string;
  passYear: string;
  aadhaar: string;
  photo: string | null;
  aadhaarFront: string | null;
  aadhaarBack: string | null;
  landDocs: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export const fetchYojnaRegistrations = createAsyncThunk(
  "yojnaRegistration/fetchYojnaRegistrations",
  async () => {
    const res = await axios.get("https://test-api.pasuseva.thundergits.com/api/yojna-registration");
    return res.data.data;
  }
);

const yojnaRegistrationSlice = createSlice({
  name: "yojnaRegistration",
  initialState: {
    data: [] as YojnaRegistrationItem[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchYojnaRegistrations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchYojnaRegistrations.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchYojnaRegistrations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching yojna registrations";
      });
  },
});

export default yojnaRegistrationSlice.reducer;