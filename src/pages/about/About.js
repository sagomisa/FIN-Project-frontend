import React from "react";
import "./About.css";
import { FaBookReader } from "react-icons/fa";
import ServicesComponent from "../../components/servicesComponent/ServicesComponent";

const About = (props) => {
  return (
    <div id="about">
      {/* <TopSection title="About Us" /> */}
      <h1>About Us</h1>
      <div className="about-container">
        <div className="about-icons">
          <FaBookReader size="80%" color="#2957A4" />
        </div>
        <div id="about-contents">
          <p>
            We pride ourselves on being a unique company where friends and funds
            incorporate together forming FIN Investments Inc.
          </p>
          <br />
          <p>
            Incorporated in 2019, FIN (Friends In Need or Funds In Need);
            whatever we may call it, the main idea of the company is to study
            markets, identify investment opportunities, execute diversified
            investments, increase return on investments, mitigate risk and
            protect wealth.
          </p>
          <br />
          <p>
            Our well diversified team consist of individual experts from
            different professional backgrounds (Finance/Management Analyst, CPA,
            Realtor, Lawyer, IT Analyst, Healthcare Professionals and Service
            Industry Experts). We are looking ahead in our journey with a clear
            long-term vision and are ready to take challenges along the way
            searching for opportunities for our financial as well as social
            wellbeing.
          </p>
        </div>
      </div>
      <ServicesComponent />
    </div>
  );
};

export default About;
