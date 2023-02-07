import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  selectIsLoggedIn,
  selectUser,
} from "../../redux/features/auth/authSlice";

export const ShowOnLogin = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (isLoggedIn) {
    return <>{children}</>;
  }
  return null;
};

export const ShowOnLogout = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (!isLoggedIn) {
    return <>{children}</>;
  }
  return null;
};
export const ShowDashboard = ({ children }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  if (currentPath === "/") {
    return <>{children}</>;
  }
  return null;
};
export const AdminOnlyLink = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  if (isLoggedIn && user?.role === "admin") {
    return <>{children}</>;
  }
  return null;
};
