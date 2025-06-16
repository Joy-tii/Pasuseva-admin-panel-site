import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosFormDataInstance from "../utils/axiosFormInstance";
import axiosInstance from "../utils/axiosInstance";
import { UserDetails } from "../features/payment/paymentSlice";
import { UserData } from "../features/auth/user.slice";

export interface YojnaRegistrationItem {
  _id: string;
  yojna: string;
  user?: UserData;
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

// ✅ Fetch all registrations
interface FetchYojnaParams {
  search?: string;
  yojna?: string;
  user?: string;
}

export const fetchYojnaRegistrations = createAsyncThunk(
  "yojnaRegistration/fetchYojnaRegistrations",
  async (params?: FetchYojnaParams) => {
    const queryParams = new URLSearchParams(); if (params?.search) queryParams.append('search', params.search);
    if (params?.yojna) queryParams.append('yojna', params.yojna);
    if (params?.user) queryParams.append('user', params.user);

    const url = `http://localhost:4013/api/yojna-registration${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    const res = await axiosInstance.get(url);
    return res.data.data;
  }
);

// ✅ Add a new customer/registration
export const addYojnaRegistration = createAsyncThunk(
  "yojnaRegistration/addYojnaRegistration",
  async (formData: any, { rejectWithValue }) => {
    try {
      const res = await axiosFormDataInstance.post(
        "http://localhost:4013/api/yojna-registration",
        formData
      );
      return res.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to add customer");
    }
  }
);

export const getYojnaRegistrationById = createAsyncThunk(
  "customer/getCustomerById",
  async (id: string) => {
    const res = await axios.get(`http://localhost:4013/api/yojna-registration/${id}`);
    return res.data.data as YojnaRegistrationItem;
  }
);

const yojnaRegistrationSlice = createSlice({
  name: "yojnaRegistration",
  initialState: {
    data: [] as YojnaRegistrationItem[],
    selectedYojnaRegistration: null as YojnaRegistrationItem | null,
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
      })

      // ✅ ADD Customer Cases
      .addCase(addYojnaRegistration.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addYojnaRegistration.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload); // ✅ add new data to state
      })
      .addCase(addYojnaRegistration.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      }).addCase(getYojnaRegistrationById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getYojnaRegistrationById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedYojnaRegistration = action.payload;
      })
      .addCase(getYojnaRegistrationById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching customer details";
      });
  },
});

export default yojnaRegistrationSlice.reducer;
