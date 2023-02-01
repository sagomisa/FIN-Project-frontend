import React from "react";
import {
  CloseIcon,
  Icon,
  SidebarContainer,
  SidebarLink,
  SidebarRoute,
  SideBtnWrap,
  SidebarWrapper,
  SidebarMenu,
} from "./NavSidebarElements";

const NavSidebar = ({ isOpen, toggle }) => {
  return (
    <>
      <SidebarContainer isOpen={isOpen} onClick={toggle}>
        <Icon onClick={toggle}>
          <CloseIcon />
        </Icon>
        <SidebarWrapper>
          <SidebarMenu>
            <SidebarLink to="about" onClick={toggle}>
              About
            </SidebarLink>
            <SidebarLink to="events" onClick={toggle}>
              Events
            </SidebarLink>
            <SidebarLink to="investment" onClick={toggle}>
              Our Investments
            </SidebarLink>
            <SidebarLink to="teams" onClick={toggle}>
              Our Team
            </SidebarLink>
            <SidebarLink to="contact" onClick={toggle}>
              Contact us
            </SidebarLink>
          </SidebarMenu>
          <SideBtnWrap>
            <SidebarRoute to="/login">Login</SidebarRoute>
          </SideBtnWrap>
        </SidebarWrapper>
      </SidebarContainer>
    </>
  );
};

export default NavSidebar;
