import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import ScrollToTop from "../../components/scrollToTop/ScrollToTop";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";

const OurInvestment = () => {
  useRedirectLoggedOutUser("/login/?path=our-investments");
  return (
    <div>
      <div className="dashboard">
        <Sidebar />
        <ScrollToTop />
        <div className="dashboard-content">
          <p>
            FIN Investments Inc. has a dedicated, dynamic and expert team for
            the investments. Our team exercises within its committees and
            sub-committees and provides a recommendation with a complete
            diligence report. We have already started and actively planning to
            increase our investments in diversified portfolios in traditional as
            well as alternative investment models.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurInvestment;
