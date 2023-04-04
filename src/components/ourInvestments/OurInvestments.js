import React from "react";
import { Link } from "react-router-dom";
import image from "../../assets/investment.jpg";
import "./OurInvestments.css";

const OurInvestments = () => {
  return (
    <div id="investment">
      <div className="investment-overlay">
        <h1>Our Investments</h1>
        <p>
          FIN Investments Inc. has a dedicated, dynamic and expert team for the
          investments. Our team exercises within its committees and
          sub-committees and provides a recommendation with a complete diligence
          report. We have already started and actively planning to increase our
          investments in diversified portfolios in traditional as well as
          alternative investment models.
        </p>
        <br />
        <p>
          FIN Investments Inc. is also open for any possible business ventures.
        </p>
        <br />
        <p>
          Please log in to access our investment portfolio on a granular level.
        </p>
        <br />
        <Link to="/our-investments">
          <button className="--btn --btn-primary --btn-lg">Login</button>
        </Link>
      </div>
    </div>
  );
};

export default OurInvestments;
