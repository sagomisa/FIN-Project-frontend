import React from "react";
import About from "../../pages/about/About";
import "./HomeContentSection.css";
import ContactForm from "../contactForm/ContactForm";
import EventComponent from "../eventComponent/EventComponent";
import OurInvestments from "../ourInvestments/OurInvestments";

function HomeContentSection() {
  return (
    <div>
      <div className="main">
        <About />
        <EventComponent />
        <OurInvestments />
        <ContactForm />
      </div>
    </div>
  );
}

export default HomeContentSection;
