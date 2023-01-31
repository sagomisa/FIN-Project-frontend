import React, { useState } from "react";
import "./Contact.css";
import TopSection from "../../components/top_section/TopSection";


const Contact = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = () => {};
  const handleChange = () => {};
  return (
    <div>
      <TopSection title="Contact Us" />
      <div className="contact-container">
        <div className="info">
          <h1>Contact Information</h1>
          <div className="contact">
            <div className="phone">
              <i className="fa-solid fa-phone"></i>
              <a href="tel:647-774-6542">647-774-6542</a>
            </div>
            <div className="address">
              <i className="fa-solid fa-location-dot"></i>
              <p>
                2900 Eglinton Avenue East, Unit #203, Scarborough, ON M1J 2E4
              </p>
            </div>
          </div>
          <div className="sm_icons">
            <i className="fa-brands fa-facebook"></i>
            <i className="fa-brands fa-linkedin"></i>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default Contact;
