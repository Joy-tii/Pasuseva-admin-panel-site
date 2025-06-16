import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UserData } from "../auth/user.slice";
import axiosInstance from "../../utils/axiosInstance";
import axiosFormDataInstance from "../../utils/axiosFormInstance";


// ✅ Interface matching Job Mongoose Schema
export interface JobItem {
    _id: string;
    position: string;
    status: "pending" | "process" | "completed";
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
    remarks: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    user?: UserData;
}

// ✅ Optional filters
interface FetchJobParams {
    search?: string;
    position?: string;
    user?: string;
}

// ✅ GET all jobs
export const fetchJobs = createAsyncThunk(
    "job/fetchJobs",
    async (params?: FetchJobParams) => {
        const queryParams = new URLSearchParams();
        if (params?.search) queryParams.append("search", params.search);
        if (params?.position) queryParams.append("position", params.position);
        if (params?.user) queryParams.append("user", params.user);

        const url = `https://api.pasuseva.thundergits.com/api/job${queryParams.toString() ? "?" + queryParams.toString() : ""}`;
        const res = await axiosInstance.get(url);
        return res.data.data;
    }
);

// ✅ POST new job
export const addJob = createAsyncThunk(
    "job/addJob",
    async (formData: any, { rejectWithValue }) => {
        try {
            const res = await axiosFormDataInstance.post(
                "https://api.pasuseva.thundergits.com/api/job",
                formData
            );
            return res.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to add job");
        }
    }
);

// ✅ GET job by ID
export const getJobById = createAsyncThunk(
    "job/getJobById",
    async (id: string) => {
        const res = await axios.get(`https://api.pasuseva.thundergits.com/api/job/${id}`);
        return res.data.data as JobItem;
    }
);

const jobSlice = createSlice({
    name: "job",
    initialState: {
        data: [] as JobItem[],
        selectedJob: null as JobItem | null,
        loading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch All Jobs
            .addCase(fetchJobs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchJobs.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchJobs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Error fetching jobs";
            })

            // Add Job
            .addCase(addJob.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addJob.fulfilled, (state, action) => {
                state.loading = false;
                state.data.push(action.payload);
            })
            .addCase(addJob.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Get Job by ID
            .addCase(getJobById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getJobById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedJob = action.payload;
            })
            .addCase(getJobById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Error fetching job details";
            });
    },
});

export default jobSlice.reducer;
