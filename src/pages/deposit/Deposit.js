import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "./Deposit.css";

const Deposit = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <h1>Welcome to Deposit Page!</h1>
      </div>
    </div>
  );
};

export default Deposit;
