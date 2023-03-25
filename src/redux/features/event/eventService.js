import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/events/`;

// Get all events
const getAllEvents = async () => {
  const response = await axios.get(API_URL + "getAllEvents");
  return response.data;
};

// Create a event
const createEvent = async (eventData) => {
  const response = await axios.post(API_URL + "createEvent", eventData);
  return response.data;
};

// Update event
const updateEvent = async (eventData) => {
  const response = await axios.put(API_URL + "updateEvent", eventData);
  return response.data;
};

// Delete event
const deleteEvent = async (id) => {
  const response = await axios.delete(API_URL + "deleteEvent/" + id);
  return response.data.message;
};

const eventService = {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};

export default eventService;
