import React, { useEffect, useState } from "react";
import "./Events.css";
import Sidebar from "../../components/sidebar/Sidebar";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FaPlus, FaPlusCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllEvents,
  createEvent,
} from "../../redux/features/event/eventSlice";
import EventCard from "../../components/eventCard/EventCard";
import moment from "moment-timezone";
import { AdminOnlyLink } from "../../components/protect/hiddenLink";
import ScrollToTop from "../../components/scrollToTop/ScrollToTop";

const eventFormState = {
  title: "",
  date: "",
  time: "",
  description: "",
};

const Events = () => {
  useRedirectLoggedOutUser("/login/?path=events");

  const [openPopup, setOpenPopup] = useState(false);
  const { events } = useSelector((state) => state.event);
  const [eventForm, setEventForm] = useState(eventFormState);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  const getPastEvents = () => {
    return events.filter((event) => {
      const today = new Date();
      const eventDate = new Date(event.date);
      return eventDate < today;
    });
  };

  const getUpcomingEvents = () => {
    return events.filter((event) => {
      const today = new Date();
      const eventDate = new Date(event.date);
      return eventDate > today;
    });
  };

  const handleEventFormChange = (e) => {
    setEventForm({
      ...eventForm,
      [e.target.name]: e.target.value,
    });
  };

  const mergeDateAndTime = (obj) => {
    const dateTimeString = obj.date + "T" + obj.time + ":00";
    const mergedDate = moment.tz(dateTimeString, 'Canada/Eastern').toDate();

    return {
      ...obj,
      date: mergedDate,
    };
  };

  const handleEventFormSubmit = (e) => {
    e.preventDefault();
    // Merge date and time
    const mergedEventForm = mergeDateAndTime(eventForm);

    dispatch(createEvent(mergedEventForm));

    // Close the popup
    setOpenPopup(false);
  };

  React.useEffect(() => {
    // Reset the form
    setEventForm(eventFormState);
  }, [openPopup]);

  const eventFormPopup = () => {
    return (
      <div className="eventFormPopup">
        <div className="eventFormPopup__content">
          <div className="eventFormPopup__header">
            <h2>Add Event</h2>
            <span
              className="eventFormPopup__closeBtn"
              onClick={() => setOpenPopup(false)}
            >
              <AiOutlineCloseCircle size={20} />
            </span>
          </div>
          <div className="eventFormPopup__body">
            <form onSubmit={handleEventFormSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={eventForm.title}
                  onChange={handleEventFormChange}
                />
              </div>
              <div className="form-container">
                <div className="form-group">
                  <label htmlFor="date">Date</label>
                  <input
                    type="date"
                    name="date"
                    id="date"
                    value={eventForm.date}
                    onChange={handleEventFormChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="time">Time</label>
                  <input
                    type="time"
                    name="time"
                    id="time"
                    value={eventForm.time}
                    onChange={handleEventFormChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  id="description"
                  cols="30"
                  rows="10"
                  value={eventForm.description}
                  onChange={handleEventFormChange}
                ></textarea>
              </div>
              <div className="form-group">
                <button className="form-button">Add Event</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <ScrollToTop />
      <div className="dashboard-content">
        <div className="eventsContainer">
          <div className="--flex-between top">
            <span>
              <h3>Our Events</h3>
            </span>
            <AdminOnlyLink>
              <span className="addEventBtn">
                <button
                  className="addEventButton --btn-primary --btn-sm"
                  onClick={() => setOpenPopup(true)}
                >
                  <FaPlus size={20} color="white" id="addIcon" />
                </button>
              </span> 
            </AdminOnlyLink>
          </div>
          <div className="upcoming-events">
            <h2>Upcoming Events</h2>
            {getUpcomingEvents().length === 0 && <p>No upcoming events</p>}
            {getUpcomingEvents().map((event) => {
              return <EventCard event={event} key={event._id} />;
            })}
          </div>

          <div className="past-events">
            <h2>Past Events</h2>
            {getPastEvents().length === 0 && <p>No past events</p>}
            {getPastEvents().map((event) => {
              return <EventCard event={event} key={event._id} />;
            })}
          </div>
          {openPopup && eventFormPopup()}
        </div>
      </div>
    </div>
  );
};

export default Events;
