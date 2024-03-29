import "./Sidebar.css";

import { Link, NavLink } from "react-router-dom";
import { AdminOnlyLink, VerifiedOnlyLink } from "../protect/hiddenLink";
function Sidebar() {
  return (
    <VerifiedOnlyLink>
      <div className="sidebar">
        <div className="sidebarWrapper">
          <div className="sidebarMenu">
            <ul className="sidebarList">
              <NavLink
                to="/profile"
                className="sidebarListItem "
                style={({ isActive }) => ({
                  color: isActive ? "#f48634" : "var(--color-dark)",
                })}
              >
                Profile
              </NavLink>
              <AdminOnlyLink>
                <NavLink
                  to="/deposit"
                  className="sidebarListItem "
                  style={({ isActive }) => ({
                    color: isActive ? "#f48634" : "var(--color-dark)",
                  })}
                >
                  Deposit
                </NavLink>
              </AdminOnlyLink>
              <NavLink
                to="/loan"
                className="sidebarListItem "
                style={({ isActive }) => ({
                  color: isActive ? "#f48634" : "var(--color-dark)",
                })}
              >
                Loan Application
              </NavLink>
              <AdminOnlyLink>
                <NavLink
                  to="/applications"
                  className="sidebarListItem "
                  style={({ isActive }) => ({
                    color: isActive ? "#f48634" : "var(--color-dark)",
                  })}
                >
                  Loan History
                </NavLink>
              </AdminOnlyLink>
              <NavLink
                to="/gallery"
                className="sidebarListItem "
                style={({ isActive }) => ({
                  color: isActive ? "#f48634" : "var(--color-dark)",
                })}
              >
                Gallery
              </NavLink>
              <NavLink
                to="/teams"
                className="sidebarListItem "
                style={({ isActive }) => ({
                  color: isActive ? "#f48634" : "var(--color-dark)",
                })}
              >
                Teams
              </NavLink>
              <NavLink
                to="/events"
                className="sidebarListItem "
                style={({ isActive }) => ({
                  color: isActive ? "#f48634" : "var(--color-dark)",
                })}
              >
                Events & Discussion
              </NavLink>
              <NavLink
                to="/blogs"
                className="sidebarListItem "
                style={({ isActive }) => ({
                  color: isActive ? "#f48634" : "var(--color-dark)",
                })}
              >
                Blogs
              </NavLink>
              <NavLink
                to="/our-investments"
                className="sidebarListItem "
                style={({ isActive }) => ({
                  color: isActive ? "#f48634" : "var(--color-dark)",
                })}
              >
                Our Investments
              </NavLink>
              <AdminOnlyLink>
                <NavLink
                  to="/users"
                  className="sidebarListItem "
                  style={({ isActive }) => ({
                    color: isActive ? "#f48634" : "var(--color-dark)",
                  })}
                >
                  Users
                </NavLink>
              </AdminOnlyLink>

              <NavLink
                to="/changePassword"
                className="sidebarListItem "
                style={({ isActive }) => ({
                  color: isActive ? "#f48634" : "var(--color-dark)",
                })}
              >
                Change Password
              </NavLink>
            </ul>
          </div>
        </div>
      </div>
    </VerifiedOnlyLink>
  );
}
export default Sidebar;
