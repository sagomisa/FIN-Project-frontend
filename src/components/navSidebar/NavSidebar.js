import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, RESET } from "../../redux/features/auth/authSlice";
import {
  CloseIcon,
  Icon,
  SidebarContainer,
  SidebarLink,
  SidebarRoute,
  SideBtnWrap,
  SidebarWrapper,
  SidebarMenu,
  SideDashboard,
} from "./NavSidebarElements";
import {
  ShowDashboard,
  ShowOnLogin,
  ShowOnLogout,
} from "../protect/hiddenLink";
import { NavbarGreeting } from "../navbar/NavbarElements";
import { FaUserCircle } from "react-icons/fa";
import { UserName } from "../../pages/profile/Profile";

const NavSidebar = ({ isOpen, toggle }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = async () => {
    dispatch(RESET());
    await dispatch(logout());
    navigate("/");
  };
  return (
    <>
      <SidebarContainer isOpen={isOpen} onClick={toggle}>
        <Icon onClick={toggle}>
          <CloseIcon />
        </Icon>
        <SidebarWrapper>
          <SidebarMenu>
            <SidebarLink to="/#about" onClick={toggle}>
              About
            </SidebarLink>
            <SidebarLink to="/#events" onClick={toggle}>
              Events
            </SidebarLink>
            <SidebarLink to="/#investment" onClick={toggle}>
              Our Investments
            </SidebarLink>
            <SidebarLink to="/#teams" onClick={toggle}>
              Our Team
            </SidebarLink>
            <SidebarLink to="/#contact" onClick={toggle}>
              Contact us
            </SidebarLink>
            <ShowOnLogin>
              <ShowDashboard>
                <SideDashboard to="/profile">Go to Dashboard</SideDashboard>
              </ShowDashboard>
            </ShowOnLogin>
            <NavbarGreeting>
              <ShowOnLogin>
                <div className="greeting">
                  <FaUserCircle size={20} className="--mb" />
                  <UserName />
                </div>
              </ShowOnLogin>
            </NavbarGreeting>
          </SidebarMenu>
          <SideBtnWrap>
            <ShowOnLogout>
              <SidebarRoute to="/login">Login</SidebarRoute>
            </ShowOnLogout>
            <ShowOnLogin>
              <SidebarRoute onClick={logoutUser}>Logout</SidebarRoute>
            </ShowOnLogin>
          </SideBtnWrap>
        </SidebarWrapper>
      </SidebarContainer>
    </>
  );
};

export default NavSidebar;
