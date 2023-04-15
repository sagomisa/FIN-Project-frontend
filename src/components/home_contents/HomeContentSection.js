import React from "react";
import About from "../../pages/about/About";
import "./HomeContentSection.css";
import ContactForm from "../contactForm/ContactForm";
import EventComponent from "../eventComponent/EventComponent";
import OurInvestments from "../ourInvestments/OurInvestments";
import OurTeamsComponent from "../ourTeamsComponent/OurTeamsComponent";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";

function HomeContentSection() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <div>
      <div className="main">
        <About />
        <EventComponent />
        <OurInvestments isLoggedIn={isLoggedIn} />
        <OurTeamsComponent isLoggedIn={isLoggedIn} />
        <ContactForm />
      </div>
    </div>
  );
}

export default HomeContentSection;
