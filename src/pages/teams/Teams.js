import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";

const Teams = () => {
  useRedirectLoggedOutUser("/login/?path=teams");
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <h1>Welcome to Teams Page!</h1>
      </div>
    </div>
  );
};

export default Teams;
