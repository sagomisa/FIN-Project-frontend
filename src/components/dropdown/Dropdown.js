import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { ShowDashboard } from "../protect/hiddenLink";
import { UserName } from "../../pages/profile/Profile";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { NavbarGreeting, NavDashboard } from "../navbar/NavbarElements";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, RESET } from "../../redux/features/auth/authSlice";
import { styled, alpha } from "@mui/material/styles";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const Dropdown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logoutUser = async () => {
    dispatch(RESET());
    await dispatch(logout());
    navigate("/");
  };
  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-button" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        endIcon={<MdOutlineKeyboardArrowDown />}
        sx={{ width: 230 }}
      >
        <NavbarGreeting>
          <FaUserCircle size={20} style={{ marginRight: 5 }} />
          <UserName />
        </NavbarGreeting>
      </Button>

      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <ShowDashboard>
            <NavDashboard to="/profile">Go to Dashboard</NavDashboard>
          </ShowDashboard>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <NavDashboard onClick={logoutUser}>Logout</NavDashboard>
        </MenuItem>
      </StyledMenu>
    </div>
  );
};

export default Dropdown;
