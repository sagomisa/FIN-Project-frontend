import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import eventService from "./eventService";

const initialState = {
  events: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const getAllEvents = createAsyncThunk("event/getAllEvents", async () => {
  const response = await eventService.getAllEvents();
  return response;
});

export const createEvent = createAsyncThunk(
  "event/createEvent",
  async (eventData) => {
    const response = await eventService.createEvent(eventData);
    return response;
  }
);

// Update event
export const updateEvent = createAsyncThunk(
  "event/updateEvent",
  async (eventData, thunkAPI) => {
    try {
      return await eventService.updateEvent(eventData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// deleteEvent
export const deleteEvent = createAsyncThunk(
  "event/deleteEvent",
  async (id, thunkAPI) => {
    try {
      return await eventService.deleteEvent(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    resetEventState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
    },
  },
  extraReducers: {
    [getAllEvents.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllEvents.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.events = action.payload;
    },
    [getAllEvents.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
      toast.error("Error fetching events");
    },
    [createEvent.pending]: (state) => {
      state.isLoading = true;
    },
    [createEvent.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.events.push(action.payload);
      toast.success("Event created successfully");
    },
    [createEvent.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
      toast.error("Error creating event");
    },
    // Update event
    [updateEvent.pending]: (state) => {
      state.isLoading = true;
    },
    [updateEvent.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isLoggedIn = true;
      state.user = action.payload;
      console.log(action.payload);
      toast.success("Profile Updated");
    },
    [updateEvent.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      toast.error(action.payload);
      console.log(action.payload);
    },
    //Delete event
    [deleteEvent.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteEvent.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload;
      toast.success(action.payload);
    },
    [deleteEvent.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      toast.error(action.payload);
    },
  },
});

export default eventSlice.reducer;

export const { resetEventState } = eventSlice.actions;
