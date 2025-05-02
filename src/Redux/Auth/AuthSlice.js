import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../Configuration/api';

// Async action for user signup (send OTP)
export const signup = createAsyncThunk('auth/signup', async (userData, { rejectWithValue }) => {
  try {
    const response = await api.post('/auth/signup', userData);
    return response.data; // The server should return a message indicating that OTP was sent
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Error during signup. Please try again.';
    console.error('Error during signup:', errorMessage);
    return rejectWithValue(errorMessage);
  }
});

// Async action for user login
export const login = createAsyncThunk('auth/login', async (loginData, { rejectWithValue }) => {
  try {
    const response = await api.post('/auth/login', loginData);
    console.log("Login successful:", response);

    // Save the JWT and user ID after successful login
    if (response.data.jwt) {
      localStorage.setItem('jwt', response.data.jwt);
      localStorage.setItem('userId', response.data.userId);  // Save the userId
      localStorage.setItem('role', response.data.role);  // Save the userId
    }

    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Error during login. Please try again.';
    console.error('Error during login:', errorMessage);
    return rejectWithValue(errorMessage);
  }
});


// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isLoading: false,
    error: null,
    otpSent: false,
  },
  reducers: {
    logout(state) {
      localStorage.removeItem('jwt'); // Remove JWT from localStorage
      localStorage.removeItem('email'); // Remove JWT from localStorage
      localStorage.removeItem('role'); // Remove JWT from localStorage
      localStorage.removeItem('userId'); // Remove JWT from localStorage
      state.user = null;
      state.isLoading = false;
      state.error = null;
      state.otpSent = false;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle signup (OTP request)
    builder.addCase(signup.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.otpSent = false;
    })
    .addCase(signup.fulfilled, (state, action) => {
      state.isLoading = false;
      state.otpSent = true;
    })
    .addCase(signup.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.otpSent = false;
    });

    // Handle login
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    })
    .addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

// Export actions
export const { logout, clearError } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
