import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../Configuration/api'; // Adjust the path as necessary

// Async Thunks for OTP API calls

// Generate and send OTP
export const generateOTP = createAsyncThunk('otp/generateOTP', async (email, { rejectWithValue }) => {
  try {
    const response = await api.post('/api/otp/generate', null, {
      params: { email },
    });
    return response.data; // Success response
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Error generating OTP');
  }
});

// Validate OTP
export const validateOTP = createAsyncThunk('otp/validateOTP', async ({ email, otp }, { rejectWithValue }) => {
  try {
    const response = await api.post('/api/otp/validate', null, {
      params: { email, otp },
    });
    return response.data; // Success response
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Error validating OTP');
  }
});

// Create the OTP slice
const otpSlice = createSlice({
  name: 'otp',
  initialState: {
    success: null,
    validationSuccess: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = null;
      state.validationSuccess = null;
    },
  },
  extraReducers: (builder) => {
    // Handle generateOTP
    builder.addCase(generateOTP.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.success = null;
    })
    .addCase(generateOTP.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = action.payload; // Success message
    })
    .addCase(generateOTP.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload; // Error message
    });

    // Handle validateOTP
    builder.addCase(validateOTP.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.validationSuccess = null;
    })
    .addCase(validateOTP.fulfilled, (state, action) => {
      state.isLoading = false;
      state.validationSuccess = action.payload; // Validation success message
    })
    .addCase(validateOTP.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload; // Error message
    });
  },
});

export const { clearError, clearSuccess } = otpSlice.actions;
export default otpSlice.reducer;
