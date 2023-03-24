import React from "react";
import "./EventCard.css";
import { AiFillCalendar, AiOutlineFieldTime } from "react-icons/ai";

const EventCard = ({ event }) => {
  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString();
  };

  const formatTime = (date) => {
    // make time like 3:00 PM
    const newDate = new Date(date);
    return newDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="eventsCard">
      <div className="event">
        <h2>{event.title}</h2>
        <div id="date-time">
          <div>
            <AiFillCalendar size={20} />
            <p>{formatDate(event.date)}</p>
          </div>
          <div>
            <AiOutlineFieldTime size={20} />
            <p>{formatTime(event.date)}</p>
          </div>
        </div>
        <div className="description">
          <p>{event.description}</p>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
