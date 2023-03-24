import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredEvents: [],
};

const eventFilterSlice = createSlice({
  name: "eventFilter",
  initialState,
  reducers: {
    FILTER_EVENTS(state, action) {
      const { events, search } = action.payload;
      const tempEvents = events.filter(
        (event) =>
          event.title.toLowerCase().includes(search.toLowerCase()) ||
          event.description.toLowerCase().includes(search.toLowerCase()) ||
          event.date.toLowerCase().includes(search.toLowerCase())
      );
      state.filteredEvents = tempEvents;
    },
  },
});

export const { FILTER_EVENTS } = eventFilterSlice.actions;

export const selectEvents = (state) => state.filter.filteredEvents;

export default eventFilterSlice.reducer;
