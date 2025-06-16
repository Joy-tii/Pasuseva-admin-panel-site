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

// ✅ Fetch all registrations
export const fetchYojnaRegistrations = createAsyncThunk(
  "yojnaRegistration/fetchYojnaRegistrations",
  async () => {
    const res = await axios.get("https://test-api.pasuseva.thundergits.com/api/yojna-registration");
    return res.data.data;
  }
);

// ✅ Add a new customer/registration
export const addYojnaRegistration = createAsyncThunk(
  "yojnaRegistration/addYojnaRegistration",
  async (formData: any, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "https://test-api.pasuseva.thundergits.com/api/yojna-registration",
        formData
      );
      return res.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to add customer");
    }
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
      });
  },
});

export default yojnaRegistrationSlice.reducer;
