import React from "react";
import "./EventCard.css";
import { AiFillCalendar, AiOutlineFieldTime } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import {
  deleteEvent,
  getAllEvents,
} from "../../redux/features/event/eventSlice";
import { confirmAlert } from "react-confirm-alert";
import { useDispatch } from "react-redux";
import { AdminOnlyLink } from "../protect/hiddenLink";

const EventCard = ({ event }) => {
  const dispatch = useDispatch();

  const removeEvent = async (id) => {
    console.log(`id3>>>>>>${id}`);
    await dispatch(deleteEvent(id));
    await dispatch(getAllEvents());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete This Event",
      message: "Are you sure to do delete this event?",
      buttons: [
        {
          label: "Delete",
          onClick: () => {
            removeEvent(id);
          },
        },
        {
          label: "Cancel",
          onClick: () => alert("Click No"),
        },
      ],
    });
  };

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
        <div className="--flex-between">
          <span>
            <h2>{event.title}</h2>
          </span>
          <AdminOnlyLink>
            <span>
              <FaTrashAlt
                size={20}
                color="red"
                onClick={() => confirmDelete(event._id)}
              />
            </span>
          </AdminOnlyLink>
        </div>
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
