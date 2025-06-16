import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface ContactState {
  data: any[];
  loading: boolean;
  error: string | null;
}

const initialState: ContactState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://test-api.pasuseva.thundergits.com/api/contact');
      const json = await response.json();
      if (!json.success) throw new Error('Fetch failed');
      return json.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear old errors
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // 🔧 Fix here
      });
  },
});

export default contactSlice.reducer;
