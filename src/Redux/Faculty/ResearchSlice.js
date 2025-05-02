import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../Configuration/api'

// Common headers for all requests
const getHeaders = () => {
  const token = localStorage.getItem('jwt');
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

// Async Thunks for Publications API

// Create a Research Publication
export const createPublication = createAsyncThunk(
  'publication/createPublication',
  async (publicationData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('jwt');
      if (!token) return rejectWithValue('Please login to continue.');

      const response = await api.post('/api/publications/create', publicationData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        (error.response?.status === 403
          ? 'Access denied.'
          : 'Failed to upload publication.');
      return rejectWithValue(message);
    }
  }
);

// Get All Research Publications
export const getAllPublications = createAsyncThunk('publication/getAllPublications', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/api/publications/all', {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Error fetching all publications');
  }
});

// Get a Research Publication by ID
export const getPublicationById = createAsyncThunk('publication/getPublicationById', async (id, { rejectWithValue }) => {
  try {
    const response = await api.get(`/api/publications/${id}`, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || `Error fetching publication with ID ${id}`);
  }
});

// Update a Research Publication
export const updatePublication = createAsyncThunk(
  'publication/updatePublication',
  async ({ id, updatedPublication, file }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('jwt');
      console.log("Payload before sending:", updatedPublication);
      const formData = new FormData();
      formData.append('publication', new Blob([JSON.stringify(updatedPublication)], {
        type: 'application/json',
      }));

      if (file) {
        formData.append('file', file);
      }
      console.log("ID", id);
      const response = await api.put(`/api/publications/update/${id}`, formData, {
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'multipart/form-data', // Automatically handled by FormData
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update publication');
    }
  }
);


// Delete a Research Publication
export const deletePublication = createAsyncThunk('publication/deletePublication', async (id, { rejectWithValue }) => {
  try {
    const response = await api.delete(`/api/publications/delete/${id}`, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || `Error deleting publication with ID ${id}`);
  }
});

// Download Publication File by ID
export const downloadPublicationFile = createAsyncThunk(
  'publication/downloadPublicationFile',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/publications/download/${id}`, {
        responseType: 'blob', // Important for downloading binary files like PDFs
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      });

      // Create a downloadable link from blob
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `publication_${id}.pdf`; // Default filename, or make it dynamic
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url); // Clean up

      return { success: true };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error downloading file');
    }
  }
);

// Search Publications by Author
export const findByAuthors = createAsyncThunk('publication/findByAuthors', async (author, { rejectWithValue }) => {
  try {
    const response = await api.get(`/api/publications/search/by-author`, {
      headers: getHeaders(),
      params: { author },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || `Error fetching publications by author: ${author}`);
  }
});

// Get Publications by Faculty ID
export const getPublicationsByFacultyId = createAsyncThunk('publication/getPublicationsByFacultyId', async (facultyId, { rejectWithValue }) => {
  try {
    const response = await api.get(`/api/publications/faculty/${facultyId}`, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || `Error fetching publications for faculty ID ${facultyId}`);
  }
});

export const getSinglePublication = createAsyncThunk(
  'publication/getSinglePublication',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/publications/single/${id}`); // Adjust endpoint as needed
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message || 'Error fetching publication');
    }
  }
);

// Fetch Research Statistics
export const fetchResearchStats = createAsyncThunk(
  'publication/fetchResearchStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/publications/stats', {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch research stats');
    }
  }
);

// Create the publication slice
const publicationSlice = createSlice({
  name: 'publication',
  initialState: {
    publications: [],
    publication: null,
    stats: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    // Handle createPublication
    builder.addCase(createPublication.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
      .addCase(createPublication.fulfilled, (state, action) => {
        state.isLoading = false;
        state.publications.push(action.payload); // Add new publication to the list
      })
      .addCase(createPublication.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Handle getAllPublications
    builder.addCase(getAllPublications.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
      .addCase(getAllPublications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.publications = Array.isArray(action.payload) ? action.payload : []; // Set all fetched publications
      })
      .addCase(getAllPublications.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Handle getPublicationById
    builder.addCase(getPublicationById.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
      .addCase(getPublicationById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.publications = Array.isArray(action.payload) ? action.payload : []; // Set the fetched publication
      })
      .addCase(getPublicationById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Handle updatePublication
    builder.addCase(updatePublication.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
      .addCase(updatePublication.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.publications.findIndex(pub => pub.id === action.payload.id);
        if (index !== -1) {
          state.publications[index] = action.payload; // Update publication in the list
        }
      })
      .addCase(updatePublication.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Handle deletePublication
    builder.addCase(deletePublication.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
      .addCase(deletePublication.fulfilled, (state, action) => {
        state.isLoading = false;
        state.publications = state.publications.filter(pub => pub.id !== action.meta.arg); // Remove the deleted publication
      })
      .addCase(deletePublication.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Handle downloadPublicationFile
    builder
      .addCase(downloadPublicationFile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(downloadPublicationFile.fulfilled, (state) => {
        state.isLoading = false;
        // Nothing else to update in state since the file is directly downloaded
      })
      .addCase(downloadPublicationFile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Handle findByAuthors
    builder.addCase(findByAuthors.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
      .addCase(findByAuthors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.publications = Array.isArray(action.payload) ? action.payload : []; // Set fetched publications by author
      })
      .addCase(findByAuthors.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Handle getPublicationsByFacultyId
    builder.addCase(getPublicationsByFacultyId.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
      .addCase(getPublicationsByFacultyId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.publications = Array.isArray(action.payload) ? action.payload : []; // Set publications by faculty ID
      })
      .addCase(getPublicationsByFacultyId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    builder.addCase(getSinglePublication.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
      .addCase(getSinglePublication.fulfilled, (state, action) => {
        state.isLoading = false;
        state.publication = action.payload;
      })
      .addCase(getSinglePublication.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Handle fetchResearchStats
    builder
      .addCase(fetchResearchStats.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchResearchStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stats = action.payload;
      })
      .addCase(fetchResearchStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

  },
});

export const { clearError } = publicationSlice.actions;
export default publicationSlice.reducer;