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

// Async Thunks for Event API

// Create an Event
export const createEvent = createAsyncThunk('event/createEvent', async (eventData, { rejectWithValue }) => {
  const token = localStorage.getItem('jwt');
  try {
    const response = await api.post('/api/events/create', eventData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Error creating event');
  }
});

// Get an Event by ID
export const getEventById = createAsyncThunk('event/getEventById', async (id, { rejectWithValue }) => {
  try {
    const response = await api.get(`/api/events/${id}`, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || `Error fetching event with ID ${id}`);
  }
});

// Get All Events
export const getAllEvents = createAsyncThunk('event/getAllEvents', async (_, { rejectWithValue }) => {
  const token = localStorage.getItem('jwt');
  try {
    const response = await api.get('/api/events/all', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Error fetching all events');
  }
});

export const updateEvent = createAsyncThunk(
  'event/updateEvent',
  async ({ id, updatedEvent, posterFile }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('jwt');  // Get the JWT token
      console.log("Payload before sending:", updatedEvent);

      // Create a FormData object to send both event data and the poster file
      const formData = new FormData();
      formData.append('event', new Blob([JSON.stringify(updatedEvent)], {
        type: 'application/json',
      }));

      if (posterFile) {
        formData.append('poster', posterFile);  // Append poster file if present
      }

      // Send the PUT request to update the event
      const response = await api.put(`/api/events/update/${id}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,  // Include the JWT token in the Authorization header
          // Do not set Content-Type explicitly as it's handled by FormData automatically
        },
      });

      return response.data;  // Return the updated event data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update event');
    }
  }
);


// Delete an Event
export const deleteEvent = createAsyncThunk('event/deleteEvent', async (id, { rejectWithValue }) => {
  try {
    const response = await api.delete(`/api/events/delete/${id}`, {
      headers: getHeaders(),
    });
    return response.data; // API response contains success message
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || `Error deleting event with ID ${id}`);
  }
});

// RSVP to an event
export const rsvpEvent = createAsyncThunk('event/rsvpEvent', async (eventId, { rejectWithValue }) => {
  try {
    const response = await api.post(`/api/events/${eventId}/rsvp`, {}, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Error RSVP-ing to event');
  }
});

// Withdraw RSVP from an event
export const withdrawEvent = createAsyncThunk('event/withdrawEvent', async (eventId, { rejectWithValue }) => {
  try {
    const response = await api.delete(`/api/events/${eventId}/withdraw`, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Error withdrawing RSVP from event');
  }
});

// Get Event Participants
export const getEventParticipants = createAsyncThunk('event/getEventParticipants', async (eventId, { rejectWithValue }) => {
  try {
    const response = await api.get(`/api/events/${eventId}/participants`, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Error fetching event participants');
  }
});

// Fetch participated events for a faculty member
export const getParticipatedEvents = createAsyncThunk(
  'event/getParticipatedEvents',
  async (facultyId, { rejectWithValue }) => {
    console.log(facultyId);
    try {
      const response = await api.get(`/api/events/participated/${facultyId}`, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error fetching participated events');
    }
  }
);

// Fetch event statistics
export const fetchEventStats = createAsyncThunk(
  'event/fetchEventStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/events/stats', {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error fetching event statistics');
    }
  }
);


// Create the event slice
const eventSlice = createSlice({
  name: 'event',
  initialState: {
    events: [],
    event: null,
    participants: [],
    participatedEvents: [],
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
    // Handle createEvent
    builder.addCase(createEvent.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.events.push(action.payload); // Add new event to the list
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Handle getAllEvents
    builder.addCase(getAllEvents.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
      .addCase(getAllEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.events = action.payload; // Set all fetched events
      })
      .addCase(getAllEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Handle getEventById
    builder.addCase(getEventById.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
      .addCase(getEventById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.event = action.payload; // Set the fetched event
      })
      .addCase(getEventById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Handle updateEvent
    builder.addCase(updateEvent.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.events.findIndex(evt => evt.id === action.payload.id);
        if (index !== -1) {
          state.events[index] = action.payload; // Update event in the list
        }
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Handle deleteEvent
    builder.addCase(deleteEvent.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.events = state.events.filter(evt => evt.id !== action.meta.arg); // Remove the deleted event
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Handle RSVP to an event
    builder.addCase(rsvpEvent.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
      .addCase(rsvpEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(rsvpEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Handle Withdraw RSVP from an event
    builder.addCase(withdrawEvent.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
      .addCase(withdrawEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(withdrawEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Handle fetching event participants
    builder.addCase(getEventParticipants.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
      .addCase(getEventParticipants.fulfilled, (state, action) => {
        state.isLoading = false;
        state.participants = action.payload; // Set the event participants
      })
      .addCase(getEventParticipants.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    builder.addCase(getParticipatedEvents.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
      .addCase(getParticipatedEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.participatedEvents = action.payload;
      })
      .addCase(getParticipatedEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

    // Handle fetchEventStats
    builder.addCase(fetchEventStats.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
      .addCase(fetchEventStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stats = action.payload;
      })
      .addCase(fetchEventStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

  },
});

export const { clearError } = eventSlice.actions;
export default eventSlice.reducer;
