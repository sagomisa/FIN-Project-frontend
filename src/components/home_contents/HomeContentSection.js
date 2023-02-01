import React from "react";
import About from "../../pages/about/About";
import "./HomeContentSection.css";
import ContactForm from "../contactForm/ContactForm";
import EventComponent from "../eventComponent/EventComponent";
import OurInvestments from "../ourInvestments/OurInvestments";
import OurTeamsComponent from "../ourTeamsComponent/OurTeamsComponent";

function HomeContentSection() {
  return (
    <div>
      <div className="main">
        <About />
        <EventComponent />
        <OurInvestments />
        <OurTeamsComponent />
        <ContactForm />
      </div>
    </div>
  );
}

export default HomeContentSection;
