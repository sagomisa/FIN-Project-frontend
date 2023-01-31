import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { animateScroll as scroll } from "react-scroll";
import {
  Nav,
  NavbarContainer,
  NavLogo,
  MobileIcon,
  NavMenu,
  NavItem,
  NavBtn,
  NavBtnLink,
  NavLinkS,
} from "./NavbarElements";
import logo from "../../assets/logo.png";

const Navbar = ({ toggle }) => {
  const [scrollNav, setScrollNav] = useState(false);

  const changeNav = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNav);
  }, []);

  const toggleHome = () => {
    scroll.scrollToTop();
  };
  return (
    <>
      <IconContext.Provider value={{ color: "#000" }}>
        <Nav scrollNav={scrollNav}>
          <NavbarContainer>
            <NavLogo to="/" onClick={toggleHome}>
              <img src={logo} alt="Logo" style={{ width: "60px" }} />
            </NavLogo>
            <MobileIcon onClick={toggle}>
              <FaBars />
            </MobileIcon>
            <NavMenu>
              <NavItem>
                <NavLinkS
                  to="about"
                  smooth={true}
                  duration={300}
                  spy={true}
                  exact="true"
                  offset={-80}
                  scrollNav={scrollNav}
                >
                  About us
                </NavLinkS>
              </NavItem>
              <NavItem>
                <NavLinkS
                  to="events"
                  smooth={true}
                  duration={300}
                  spy={true}
                  exact="true"
                  offset={-80}
                  scrollNav={scrollNav}
                >
                  Events
                </NavLinkS>
              </NavItem>
              <NavItem>
                <NavLinkS
                  to="investment"
                  smooth={true}
                  duration={300}
                  spy={true}
                  exact="true"
                  offset={-80}
                  scrollNav={scrollNav}
                >
                  Our Investments
                </NavLinkS>
              </NavItem>
              <NavItem>
                <NavLinkS
                  to="team"
                  smooth={true}
                  duration={300}
                  spy={true}
                  exact="true"
                  offset={-80}
                  scrollNav={scrollNav}
                >
                  Our Team
                </NavLinkS>
              </NavItem>

              <NavItem>
                <NavLinkS
                  to="contact"
                  smooth={true}
                  duration={300}
                  spy={true}
                  exact="true"
                  offset={-80}
                  scrollNav={scrollNav}
                >
                  Contact us
                </NavLinkS>
              </NavItem>
            </NavMenu>
            <NavBtn>
              <NavBtnLink to="/login">Login</NavBtnLink>
            </NavBtn>
          </NavbarContainer>
        </Nav>
      </IconContext.Provider>
    </>
  );
};

export default Navbar;
