import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import "./Dashboard.css";

const Dashboard = () => {
  useRedirectLoggedOutUser("/login");
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <h1>Welcome!</h1>
      </div>
    </div>
  );
};

export default Dashboard;
