import React from "react";
import "./TopSection.css";
const TopSection = (props) => {
  return (
    <div className="topSection">
      <h1>{props.title}</h1>
    </div>
  );
};

export default TopSection;
