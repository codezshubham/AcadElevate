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

// Async Thunks for Project API

// Create a Project
export const createProject = createAsyncThunk('project/createProject', async (projectData, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('jwt');
    if (!token) throw new Error('Authentication token is missing');

    const response = await api.post('/api/projects/create', projectData, {
      headers: getHeaders(),
    });

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Error creating project');
  }
});

// Get a Project by ID
export const getProjectById = createAsyncThunk('project/getProjectById', async (id, { rejectWithValue }) => {
  try {
    const response = await api.get(`/api/projects/single/${id}`, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || `Error fetching project with ID ${id}`);
  }
});

// Get All Projects
export const getAllProjects = createAsyncThunk('project/getAllProjects', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/api/projects/all', {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Error fetching all projects');
  }
});

// Update a Project
export const updateProject = createAsyncThunk('project/updateProject', async ({ id, updatedProject }, { rejectWithValue }) => {
  try {
    const response = await api.put(`/api/projects/update/${id}`, updatedProject, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || `Error updating project with ID ${id}`);
  }
});

// Delete a Project
export const deleteProject = createAsyncThunk('project/deleteProject', async (id, { rejectWithValue }) => {
  try {
    const response = await api.delete(`/api/projects/delete/${id}`, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || `Error deleting project with ID ${id}`);
  }
});

// Get Publications by Faculty ID
export const getProjectsByFacultyId = createAsyncThunk('project/getProjectsByFacultyId', async (facultyId, { rejectWithValue }) => {
  try {
    const response = await api.get(`/api/projects/faculty/${facultyId}`, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || `Error fetching projects for faculty ID ${facultyId}`);
  }
});

export const fetchProjectStats = createAsyncThunk(
  'projectStats/fetchProjectStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/projects/stats', {
        headers: getHeaders(),
      });
      return response.data; // Return the project stats
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch project stats');
    }
  }
);

// Create the project slice
const projectSlice = createSlice({
  name: 'project',
  initialState: {
    projects: [],
    project: null,
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
    // Handle createProject
    builder.addCase(createProject.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
      .addCase(createProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projects.push(action.payload); // Add new project to the list
      })
      .addCase(createProject.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Handle getAllProjects
    builder.addCase(getAllProjects.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
      .addCase(getAllProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projects = action.payload; // Set all fetched projects
      })
      .addCase(getAllProjects.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Handle getProjectById
    builder.addCase(getProjectById.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
      .addCase(getProjectById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.project = action.payload; // Set the fetched project
      })
      .addCase(getProjectById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Handle updateProject
    builder.addCase(updateProject.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.projects.findIndex(proj => proj.id === action.payload.id);
        if (index !== -1) {
          state.projects[index] = action.payload; // Update project in the list
        }
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    builder.addCase(getProjectsByFacultyId.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
      .addCase(getProjectsByFacultyId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projects = Array.isArray(action.payload) ? action.payload : []; // Set publications by faculty ID
      })
      .addCase(getProjectsByFacultyId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    // Handle deleteProject
    builder.addCase(deleteProject.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projects = state.projects.filter(proj => proj.id !== action.meta.arg); // Remove the deleted project
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(fetchProjectStats.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProjectStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stats = action.payload;
      })
      .addCase(fetchProjectStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = projectSlice.actions;
export default projectSlice.reducer;