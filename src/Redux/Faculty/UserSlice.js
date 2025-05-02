import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../Configuration/api';

// Common headers for all requests
const getHeaders = () => {
  const token = localStorage.getItem('jwt');
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

// Async Thunks for API calls

// Create User
export const createUser = createAsyncThunk('user/createUser', async (userData, { rejectWithValue }) => {
  try {
    const response = await api.post('/api/users/create', userData, { headers: getHeaders() });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Error creating user');
  }
});

// Get User Profile
export const getUserProfile = createAsyncThunk('user/getUserProfile', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/api/users/profile', { headers: getHeaders() });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Error fetching user profile');
  }
});

// Get User by ID
export const getUserById = createAsyncThunk('user/getUserById', async (id, { rejectWithValue }) => {
  try {
    const response = await api.get(`/api/users/${id}`, { headers: getHeaders() });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || `Error fetching user with ID ${id}`);
  }
});

// Get All Users
export const getAllUsers = createAsyncThunk('user/getAllUsers', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/api/users/all', { headers: getHeaders() });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Error fetching all users');
  }
});

// Update User
export const updateUser = createAsyncThunk('user/updateUser', async ({ id, updatedUser }, { rejectWithValue }) => {
  try {
    const response = await api.put(`/api/users/${id}`, updatedUser, { headers: getHeaders() });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || `Error updating user with ID ${id}`);
  }
});

// Delete User
export const deleteUser = createAsyncThunk('user/deleteUser', async (id, { rejectWithValue }) => {
  try {
    const response = await api.delete(`/api/users/${id}`, { headers: getHeaders() });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || `Error deleting user with ID ${id}`);
  }
});

// Upload User Image
export const uploadImage = createAsyncThunk(
  'user/uploadImage',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('jwt');
      const response = await api.post(`/api/users/${id}/uploadImage`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error uploading image');
    }
  }
);

// Update User Image
export const updateImage = createAsyncThunk(
  'user/updateImage',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('jwt');
      const response = await api.put(`/api/users/${id}/updateImage`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error updating image');
    }
  }
);

// Get User Image
export const getImage = createAsyncThunk('user/getImage', async (id, { rejectWithValue }) => {
  try {
    const response = await api.get(`/api/users/${id}/image`, {
      headers: getHeaders(),
      responseType: 'blob',
    });
    return URL.createObjectURL(response.data); // Blob to Object URL
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Error fetching image');
  }
});

// Slice
const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    users: [],
    image: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Create User
    builder.addCase(createUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Get Profile
    builder.addCase(getUserProfile.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Get User By ID
    builder.addCase(getUserById.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Get All Users
    builder.addCase(getAllUsers.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Update User
    builder.addCase(updateUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Delete User
    builder.addCase(deleteUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = state.users.filter(user => user.id !== action.meta.arg);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Upload Image
    builder.addCase(uploadImage.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = { ...state.user, imageUrl: action.payload.imageUrl };
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Update Image
    builder.addCase(updateImage.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
      .addCase(updateImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = { ...state.user, imageUrl: action.payload.imageUrl };
      })
      .addCase(updateImage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Get Image
    builder.addCase(getImage.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
      .addCase(getImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.image = action.payload;
      })
      .addCase(getImage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = userSlice.actions;
export default userSlice.reducer;