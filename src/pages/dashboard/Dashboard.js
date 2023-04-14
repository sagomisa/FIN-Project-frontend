import React from "react";
import { useSelector } from "react-redux";
import Notification from "../../components/notification/Notification";
import Sidebar from "../../components/sidebar/Sidebar";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { selectUser } from "../../redux/features/auth/authSlice";
import "./Dashboard.css";

const Dashboard = () => {
  useRedirectLoggedOutUser("/login");

  const user = useSelector(selectUser);
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <h1>Welcome to your dashboard!</h1>
      </div> 
    </div>
  );
};

export default Dashboard;
