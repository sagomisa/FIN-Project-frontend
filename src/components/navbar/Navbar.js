import React, { useEffect, useState } from "react";
import { FaBars, FaUserCircle } from "react-icons/fa";
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
  NavbarGreeting,
  NavDashboard,
} from "./NavbarElements";
import logo from "../../assets/logo.png";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, RESET } from "../../redux/features/auth/authSlice";
import {
  ShowDashboard,
  ShowOnLogin,
  ShowOnLogout,
} from "../protect/hiddenLink";

const Navbar = ({ toggle }) => {
  const [scrollNav, setScrollNav] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const logoutUser = async () => {
    dispatch(RESET());
    await dispatch(logout());
    navigate("/login");
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
                  to="teams"
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
              <ShowOnLogin>
                <ShowDashboard>
                  <NavDashboard to="/dashboard">Go to Dashboard</NavDashboard>
                </ShowDashboard>
              </ShowOnLogin>
              <NavbarGreeting>
                <ShowOnLogin>
                  <FaUserCircle size={20} />
                  <p className="--color-dark">Hi, Nisha </p>
                </ShowOnLogin>
              </NavbarGreeting>
            </NavMenu>

            <ShowOnLogout>
              <NavBtn>
                <NavBtnLink to="/login">Login</NavBtnLink>
              </NavBtn>
            </ShowOnLogout>
            <ShowOnLogin>
              <NavBtn>
                <NavBtnLink onClick={logoutUser}>Logout</NavBtnLink>
              </NavBtn>
            </ShowOnLogin>
          </NavbarContainer>
        </Nav>
      </IconContext.Provider>
    </>
  );
};

export default Navbar;
