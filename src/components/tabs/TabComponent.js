import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { NavLink } from "react-router-dom";
import "./TabComponent.css";

const TabComponent = () => {
  return (
    <div>
      <nav className="profile-page-links --btn-secondary  --p --mb">
        <ul className="home-links ">
          <li>
            <NavLink to="/profile">Profile</NavLink>
          </li>
          <li>
            <NavLink to="/changePassword">Change Password</NavLink>
          </li>
          <li>
            <NavLink to="/users">Users</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default TabComponent;
