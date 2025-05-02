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

// Async Thunks for Document API

// Create a new document
export const createDocument = createAsyncThunk('document/createDocument', async (documentData, { rejectWithValue }) => {
  try {
    const response = await api.post('/api/documents/create', documentData, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Error creating document');
  }
});

// Get a document by ID
export const getDocumentById = createAsyncThunk('document/getDocumentById', async (id, { rejectWithValue }) => {
  try {
    const response = await api.get(`/api/documents/${id}`, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || `Error fetching document with ID ${id}`);
  }
});

// Get all documents
export const getAllDocuments = createAsyncThunk('document/getAllDocuments', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/api/documents/all', {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Error fetching documents');
  }
});

// Update a document
export const updateDocument = createAsyncThunk('document/updateDocument', async ({ id, updatedDocument }, { rejectWithValue }) => {
  try {
    const response = await api.put(`/api/documents/update/${id}`, updatedDocument, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || `Error updating document with ID ${id}`);
  }
});

// Delete a document
export const deleteDocument = createAsyncThunk('document/deleteDocument', async (id, { rejectWithValue }) => {
  try {
    const response = await api.delete(`/api/documents/delete/${id}`, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || `Error deleting document with ID ${id}`);
  }
});

// Create the document slice
const documentSlice = createSlice({
  name: 'document',
  initialState: {
    documents: [],
    document: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    // Handle createDocument
    builder.addCase(createDocument.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(createDocument.fulfilled, (state, action) => {
      state.isLoading = false;
      state.documents.push(action.payload); // Add new document to the list
    })
    .addCase(createDocument.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Handle getAllDocuments
    builder.addCase(getAllDocuments.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(getAllDocuments.fulfilled, (state, action) => {
      state.isLoading = false;
      state.documents = action.payload; // Set all fetched documents
    })
    .addCase(getAllDocuments.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Handle getDocumentById
    builder.addCase(getDocumentById.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(getDocumentById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.document = action.payload; // Set the fetched document
    })
    .addCase(getDocumentById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Handle updateDocument
    builder.addCase(updateDocument.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(updateDocument.fulfilled, (state, action) => {
      state.isLoading = false;
      const index = state.documents.findIndex(doc => doc.id === action.payload.id);
      if (index !== -1) {
        state.documents[index] = action.payload; // Update document in the list
      }
    })
    .addCase(updateDocument.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Handle deleteDocument
    builder.addCase(deleteDocument.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(deleteDocument.fulfilled, (state, action) => {
      state.isLoading = false;
      state.documents = state.documents.filter(doc => doc.id !== action.meta.arg); // Remove the deleted document
    })
    .addCase(deleteDocument.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { clearError } = documentSlice.actions;
export default documentSlice.reducer;