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
              <a href="#">Useful Links</a>
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
          {/* <div className="contact">
            <div className="phone">
              <i className="fa-solid fa-phone"></i>
              <a href="tel:647-774-6542">647-774-6542</a>
            </div>
            <div className="address">
              <i className="fa-solid fa-location-dot"></i>
              <p>
                2900 Eglinton Avenue East, Unit #203, Scarborough, ON M1J 2E4
              </p>
            </div>
          </div> */}
          <div className="sm_icons">
            <i className="fa-brands fa-facebook"></i>
            <i className="fa-brands fa-linkedin"></i>
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
