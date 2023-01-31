import React, { useState } from "react";
import Footer from "../footer/Footer";
import LogoNavbar from "../logoNavbar/LogoNavbar";

const LayoutLogoNav = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <LogoNavbar />
      <div className="--pad" style={{ minHeight: "80vh" }}>
        {children}
      </div>
      <Footer />
    </>
  );
};

export default LayoutLogoNav;
