import React from "react";
import "./HeaderHero.css";
import logo from "../../assets/logo.png";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const HeaderHero = () => {
  return (
    <div className="headerHero">
      <div className="header-info">
        <div>
          <h1>FIN INVESTMENTS INC.</h1>
        </div>
        <div>
          <h2>Together Towards Eminence</h2>
        </div>
      </div>
      <div id="logo">
        <img src={logo} alt="FIN logo" />
      </div>
    </div>
  );
};

export default HeaderHero;
