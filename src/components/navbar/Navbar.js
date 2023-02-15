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
  NavLinkR,
} from "./NavbarElements";
import logo from "../../assets/logo.png";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { logout, RESET } from "../../redux/features/auth/authSlice";
import {
  ShowDashboard,
  ShowOnLogin,
  ShowOnLogout,
} from "../protect/hiddenLink";
import { UserName } from "../../pages/profile/Profile";
import { navbarList } from "./NavbarList";

const Navbar = ({ toggle }) => {
  const [scrollNav, setScrollNav] = useState(false);
  const [selectedElementFromDashboard, setSelectedElementFromDashboard] =
    useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // I'm using this to check the current path.
  console.log(location.pathname);

  /*
    How it works:
    1. When the user clicks on the dashboard link, the dashboard component will set the selectedElementFromDashboard state to the id of the element that the user wants to scroll to.
    2. When the user clicks on the dashboard link, the user will be redirected to the home page.
    3. When the user is redirected to the home page, the useEffect hook will check if the selectedElementFromDashboard state is not empty.
    4. If the selectedElementFromDashboard state is not empty, the useEffect hook will scroll to the element with the id that is stored in the selectedElementFromDashboard state.
    5. After the useEffect hook has scrolled to the element, the selectedElementFromDashboard state will be set to an empty string.
  */
  useEffect(() => {
    if (location.pathname === "/") {
      if (selectedElementFromDashboard !== "") {
        const element = document.getElementById(selectedElementFromDashboard);
        element.scrollIntoView({ behavior: "smooth" });

        setSelectedElementFromDashboard("");
      }
    }

    if (location.pathname === "/dashboard") {
      // Whenever user navigates to dashboard, scroll to top of page.
      window.scrollTo(0, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

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
    navigate("/");
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
              {navbarList.map((item) => {
                return (
                  // When the user is on the home page, the NavLinkS component will be used. When the user is not on the home page, the NavLinkR component will be used.
                  <NavItem key={item.id}>
                    {location.pathname === "/" ? (
                      <NavLinkS
                        to={item.to}
                        smooth={true}
                        duration={300}
                        spy={true}
                        exact="true"
                        offset={-80}
                        scrollNav={scrollNav}
                      >
                        {item.title}
                      </NavLinkS>
                    ) : (
                      <NavLinkR
                        to={"/"}
                        onClick={() => {
                          setSelectedElementFromDashboard(item.to);
                        }}
                      >
                        {item.title}
                      </NavLinkR>
                    )}
                  </NavItem>
                );
              })}

              <ShowOnLogin>
                <ShowDashboard>
                  <NavDashboard to="/dashboard">Go to Dashboard</NavDashboard>
                </ShowDashboard>
              </ShowOnLogin>
              <NavbarGreeting>
                <ShowOnLogin>
                  <div className="greeting">
                    <FaUserCircle size={20} />
                    <UserName />
                  </div>
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
