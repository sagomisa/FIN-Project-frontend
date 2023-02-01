import React from "react";
import { Link } from "react-router-dom";
import "./OurTeamsComponent.css";

const OurTeamsComponent = () => {
  return (
    <div id="teams">
      <div className="teams-overlay">
        <h1>Our Teams</h1>
        <p>
          We pride ourselves on being a unique company where friends and funds
          incorporate together forming FIN Investments Inc.
        </p>
        <br />
        <p>
          Our well diversified team consist of individual experts from different
          professional backgrounds (Finance/Management Analyst, CPA, Realtor,
          Lawyer, IT Analyst, Healthcare Professionals and Service Industry
          Experts). We are looking ahead in our journey with a clear long-term
          vision and are ready to take challenges along the way searching for
          opportunities for our financial as well as social wellbeing.
        </p>
        <br />
        <p>Please log in to access our team.</p>
        <br />
        <Link to="/login">
          <button className="--btn --btn-primary --btn-lg">Login</button>
        </Link>
      </div>
    </div>
  );
};

export default OurTeamsComponent;
