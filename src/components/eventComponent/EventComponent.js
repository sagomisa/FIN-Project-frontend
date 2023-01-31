import React from "react";
import "./EventComponent.css";
import { AiFillCalendar, AiOutlineFieldTime } from "react-icons/ai";

const EventComponent = () => {
  return ( 
    <div id="events">
      <div className="events-container">
        <h1>Our Events</h1>
        <div id="events-section">
          <div className="up-event">
            <h3>Upcoming Events</h3>
            <div className="event">
              <h3>Annual General Meeting (AGM)</h3>
              <div className="--flex-start --mb">
                <AiFillCalendar size={20} />
                <p className="--ml "> July 2023</p>
              </div>
              <div className="--flex-start ">
                <AiOutlineFieldTime size={20} />
                <p className="--ml "> 2:00 PM</p>
              </div>
            </div>
          </div>
          <div className="past-event">
            <h3>Past Events</h3>
            <div className="event">
              <h3>Annual General Meeting (AGM)(to be changed)</h3>
            </div>
            <div className="event">
              <h3>Annual General Meeting (AGM)(to be changed)</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventComponent;
