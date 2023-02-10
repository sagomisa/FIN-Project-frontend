import React from "react";
import { FaUsers } from "react-icons/fa";
import InfoBox from "../infoBox/InfoBox";
import "./UserStats.scss";

//Icons
const icon = <FaUsers size={40} color="#fff" />;
const UserStats = () => {
  return (
    <div className="user-summary">
      <h3 className="--mt">User Stats</h3>
      <div className="info-summary">
        <InfoBox
          icon={icon}
          title={"Total Users"}
          count={"10"}
          bgColor="card1"
        />
        <InfoBox icon={icon} title={"Members"} count={"10"} bgColor="card2" />
        <InfoBox
          icon={icon}
          title={"Loan Admin"}
          count={"10"}
          bgColor="card3"
        />
        <InfoBox icon={icon} title={"Admin"} count={"10"} bgColor="card4" />
      </div>
    </div>
  );
};

export default UserStats;
