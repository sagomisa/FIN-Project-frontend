import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";

import "./Dashboard.css";

const dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <h1>Welcome!</h1>
      </div>
    </div>
  );
};

export default dashboard;
