import React from "react";
import "./Footer.css";
import logo from "../../assets/logo.png";

function Footer() {
  return (
    <div className="footerContainer">
      <div id="mainFooter">
        <div id="column2">
          <h2>Navigation</h2>
          <ul>
            <li>
              <a href="/blogs">Blogs</a>
            </li>
            <li>
              <a href="/usefulLinks">Useful Links</a>
            </li>
            <li>
              <a href="/termsOfUse">Terms of Use</a>
            </li>

            <li>
              <a href="/privacyPolicy">Privacy Policy</a>
            </li>
          </ul>
        </div>
        <div id="column3">
          <h2>Contact Us</h2>

          <div className="sm_icons">
            <i className="fa-brands fa-facebook"></i>
          </div>
        </div>
      </div>
      <div id="divider"></div>
      <div id="copyright">
        <p>© Copyright 2023 FIN Investments Inc. All rights reserved. </p>
      </div>
    </div>
  );
}

export default Footer;
