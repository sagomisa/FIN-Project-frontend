import React from "react";
import "./ServicesComponent.css";
import { GiStairsGoal, GiTeamIdea } from "react-icons/gi";
import { FaHandHoldingHeart } from "react-icons/fa";

const ServicesComponent = () => {
  return (
    <div class="main-section">
      {/* <h1 style={{textAlign: "center"}}>About Us</h1> */}
      <div class="row">
        <div class="service">
          <div className="service-icons">
            <FaHandHoldingHeart size={40} color="#2957A4" />
          </div>
          <h2>Our Values</h2>
          <ul>
            <li>Integrity</li>
            <li>Professionalism</li>
            <li>Transarency</li>
          </ul>
        </div>
        <div class="service">
          <div className="service-icons">
            <GiStairsGoal size={40} color="#2957A4" />
          </div>
          <h2>Our Goal/Objectives</h2>
          <ul>
            <li>Optimize Investment</li>
            <li>Mitigate Risks</li>
            <li>Secure Wealth</li>
          </ul>
        </div>
        <div class="service">
          <div className="service-icons">
            <GiTeamIdea size={40} color="#2957A4" />
          </div>
          <h2>Our Plan/Strategies</h2>
          <ul>
            <li>Collect Capital</li>
            <li>Diversify Investments</li>
            <li>Increase ROI</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ServicesComponent;
