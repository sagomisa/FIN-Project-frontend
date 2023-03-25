import React from "react";
import "./EventComponent.css";
import { AiFillCalendar, AiOutlineFieldTime } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "../../redux/features/event/eventSlice";

const EventComponent = () => {
  const { events } = useSelector((state) => state.event);
  const dispatch = useDispatch();

  React.useEffect(() => {
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

  const formatDate = (date) => {
    const dateObj = new Date(date);
    const month = dateObj.toLocaleString("default", { month: "long" });
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    const lastLoanDate = Date.parse("2023-03-01");
    const days = dateObj - lastLoanDate;
    console.log(days);
    return `${month} ${day}, ${year}`;
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
    <div id="events">
      <div className="events-container">
        <h1>Our Events</h1>
        <div id="events-section">
          <div className="up-event">
            <h3>Upcoming Events</h3>
            <div className="event">
              <div className="">
                {getUpcomingEvents().length === 0 && <p>No upcoming events</p>}
                {
                  getUpcomingEvents().map((event) => {
                    return (
                      <>
                        <Link to={"/events"}>
                          <h3>{event.title}</h3>
                        </Link>
                        <div className="--flex-start">
                          <AiFillCalendar size={20} />
                          <p className="--ml "> {formatDate(event.date)}</p>
                        </div>

                        <div className="--flex-start --mt">
                          <AiOutlineFieldTime size={20} />
                          <p className="--ml "> {formatTime(event.date)}</p>
                        </div>
                      </>
                    );
                  })[0]
                }
              </div>
            </div>
          </div>
          <div className="past-event">
            <h3>Past Events</h3>
            {getPastEvents().length === 0 && <p>No past events</p>}
            {getPastEvents()
              .slice(0, 2)
              .map((event) => {
                return (
                  <div className="event">
                    <Link to={"/events"}>
                      <h3>{event.title}</h3>
                    </Link>
                    <div className="">
                      <div className="--flex-start">
                        <AiFillCalendar size={20} />
                        <p className="--ml "> {formatDate(event.date)}</p>
                      </div>

                      <div className="--flex-start --mt">
                        <AiOutlineFieldTime size={20} />
                        <p className="--ml "> {formatTime(event.date)}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventComponent;
