import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import api from '../../Configuration/api'

// Helper function to get authorization headers with JWT
const getHeaders = () => {
  const token = localStorage.getItem('jwt');
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

// Async Thunks for Appraisal API

// Create a new appraisal
export const createAppraisal = createAsyncThunk('appraisal/createAppraisal', async (appraisalData, { rejectWithValue }) => {
  try {
    const response = await api.post('/api/appraisals/create', appraisalData, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Error creating appraisal');
  }
});

// Get an appraisal by ID
export const getAppraisalById = createAsyncThunk('appraisal/getAppraisalById', async (id, { rejectWithValue }) => {
  try {
    const response = await api.get(`/api/appraisals/${id}`, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || `Error fetching appraisal with ID ${id}`);
  }
});

// Get all appraisals
export const getAllAppraisals = createAsyncThunk('appraisal/getAllAppraisals', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/api/appraisals/all', {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Error fetching appraisals');
  }
});

// Update an appraisal
export const updateAppraisal = createAsyncThunk('appraisal/updateAppraisal', async ({ id, updatedAppraisal }, { rejectWithValue }) => {
  try {
    const response = await api.put(`/api/appraisals/update/${id}`, updatedAppraisal, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || `Error updating appraisal with ID ${id}`);
  }
});

// Delete an appraisal
export const deleteAppraisal = createAsyncThunk('appraisal/deleteAppraisal', async (id, { rejectWithValue }) => {
  try {
    const response = await api.delete(`/api/appraisals/delete/${id}`, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || `Error deleting appraisal with ID ${id}`);
  }
});

// Create the appraisal slice
const appraisalSlice = createSlice({
  name: 'appraisal',
  initialState: {
    appraisals: [],
    appraisal: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    // Handle createAppraisal
    builder.addCase(createAppraisal.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(createAppraisal.fulfilled, (state, action) => {
      state.isLoading = false;
      state.appraisals.push(action.payload); // Add new appraisal to the list
    })
    .addCase(createAppraisal.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Handle getAllAppraisals
    builder.addCase(getAllAppraisals.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(getAllAppraisals.fulfilled, (state, action) => {
      state.isLoading = false;
      state.appraisals = action.payload; // Set all fetched appraisals
    })
    .addCase(getAllAppraisals.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Handle getAppraisalById
    builder.addCase(getAppraisalById.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(getAppraisalById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.appraisal = action.payload; // Set the fetched appraisal
    })
    .addCase(getAppraisalById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Handle updateAppraisal
    builder.addCase(updateAppraisal.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(updateAppraisal.fulfilled, (state, action) => {
      state.isLoading = false;
      const index = state.appraisals.findIndex(app => app.id === action.payload.id);
      if (index !== -1) {
        state.appraisals[index] = action.payload; // Update appraisal in the list
      }
    })
    .addCase(updateAppraisal.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Handle deleteAppraisal
    builder.addCase(deleteAppraisal.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(deleteAppraisal.fulfilled, (state, action) => {
      state.isLoading = false;
      state.appraisals = state.appraisals.filter(app => app.id !== action.meta.arg); // Remove the deleted appraisal
    })
    .addCase(deleteAppraisal.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { clearError } = appraisalSlice.actions;
export default appraisalSlice.reducer;