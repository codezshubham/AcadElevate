import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../Configuration/api'; 

// 🔹 Async thunk to send OTP to user's email
export const sendOtp = createAsyncThunk(
  'auth/sendOtp',
  async (email, { rejectWithValue }) => {
    try {
      const res = await api.post('/auth/send-otp', { email });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Email is not registered");
    }
  }
);

// 🔹 Async thunk to reset password
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ email, newPassword }, { rejectWithValue }) => {
    try {
      const res = await api.post('/auth/reset-password', { email, newPassword });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Password reset failed");
    }
  }
);

const forgetPasswordSlice = createSlice({
  name: 'forgetPassword',
  initialState: {
    loading: false,
    error: null,
    success: false,
    otpSent: false,
  },
  reducers: {
    clearStatus: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.otpSent = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 sendOtp
      .addCase(sendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.otpSent = false;
      })
      .addCase(sendOtp.fulfilled, (state) => {
        state.loading = false;
        state.otpSent = true;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        state.otpSent = false;
      })

      // 🔹 resetPassword
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearStatus } = forgetPasswordSlice.actions;

export default forgetPasswordSlice.reducer;
