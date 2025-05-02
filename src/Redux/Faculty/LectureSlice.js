import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import api from '../../Configuration/api'

// Common headers for all requests
const getHeaders = () => {
  const token = localStorage.getItem('jwt');
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

// Async Thunks for Lecture API
// Create a Lecture
export const createLecture = createAsyncThunk('lecture/createLecture', async (lectureData, { rejectWithValue }) => {
  try {
    const response = await api.post('/api/lectures/create', lectureData, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Error creating lecture');
  }
});

// Get a Lecture by ID
export const getLectureById = createAsyncThunk('lecture/getLectureById', async (id, { rejectWithValue }) => {
  try {
    const response = await api.get(`/api/lectures/${id}`, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || `Error fetching lecture with ID ${id}`);
  }
});

// Get All Lectures
export const getAllLectures = createAsyncThunk('lecture/getAllLectures', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/api/lectures/all', {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Error fetching all lectures');
  }
});

// Update a Lecture
export const updateLecture = createAsyncThunk('lecture/updateLecture', async ({ id, updatedLecture }, { rejectWithValue }) => {
  try {
    const response = await api.put(`/api/lectures/update/${id}`, updatedLecture, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || `Error updating lecture with ID ${id}`);
  }
});

// Delete a Lecture
export const deleteLecture = createAsyncThunk('lecture/deleteLecture', async (id, { rejectWithValue }) => {
  try {
    const response = await api.delete(`/api/lectures/delete/${id}`, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || `Error deleting lecture with ID ${id}`);
  }
});


// RSVP
export const rsvpLecture = createAsyncThunk('lecture/rsvpLecture', async (lectureId, { rejectWithValue }) => {
  try {
    const response = await api.post(`/api/lectures/${lectureId}/rsvp`, {}, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Error RSVPing lecture');
  }
});

// Withdraw
export const withdrawLecture = createAsyncThunk('lecture/withdrawLecture', async (lectureId, { rejectWithValue }) => {
  try {
    const response = await api.delete(`/api/lectures/${lectureId}/withdraw`, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Error withdrawing RSVP');
  }
});

// Participants
export const getLectureParticipants = createAsyncThunk('lecture/getParticipants', async (lectureId, { rejectWithValue }) => {
  try {
    const response = await api.get(`/api/lectures/${lectureId}/participants`, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Error fetching participants');
  }
});

// Participated lectures
export const getParticipatedLectures = createAsyncThunk('lecture/getParticipatedLectures', async (facultyId, { rejectWithValue }) => {
  try {
    const response = await api.get(`/api/lectures/participated/${facultyId}`, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Error fetching participated lectures');
  }
});

export const fetchLectureStats = createAsyncThunk(
  "lecture/fetchLectureStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/lectures/stats", {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch lecture statistics"
      );
    }
  }
);

// Initial State
const initialState = {
  lectures: [],
  lecture: null,
  participants: [],
  participatedLectures: [],
  stats: [],
  isLoading: false,
  error: null,
};

// Slice
const lectureSlice = createSlice({
  name: 'lecture',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createLecture.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createLecture.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lectures.push(action.payload);
      })
      .addCase(createLecture.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Get All
      .addCase(getAllLectures.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllLectures.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lectures = action.payload;
      })
      .addCase(getAllLectures.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Get By ID
      .addCase(getLectureById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getLectureById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lecture = action.payload;
      })
      .addCase(getLectureById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateLecture.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateLecture.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lectures = state.lectures.map((lec) =>
          lec.id === action.payload.id ? action.payload : lec
        );
      })
      .addCase(updateLecture.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteLecture.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteLecture.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lectures = state.lectures.filter((lec) => lec.id !== action.payload);
      })
      .addCase(deleteLecture.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // RSVP
      .addCase(rsvpLecture.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(rsvpLecture.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(rsvpLecture.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Withdraw
      .addCase(withdrawLecture.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(withdrawLecture.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(withdrawLecture.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Get Participants
      .addCase(getLectureParticipants.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getLectureParticipants.fulfilled, (state, action) => {
        state.isLoading = false;
        state.participants = action.payload;
      })
      .addCase(getLectureParticipants.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Get Participated Lectures
      .addCase(getParticipatedLectures.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getParticipatedLectures.fulfilled, (state, action) => {
        state.isLoading = false;
        state.participatedLectures = action.payload;
      })
      .addCase(getParticipatedLectures.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Fetch Lecture Stats
      .addCase(fetchLectureStats.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLectureStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stats = action.payload;
      })
      .addCase(fetchLectureStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = lectureSlice.actions;
export default lectureSlice.reducer;