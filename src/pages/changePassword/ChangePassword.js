import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import profileImg from "../../assets/logo.png";
import Card from "../../components/card/Card";
import PasswordInput from "../../components/passwordInput/PasswordInput";
import Sidebar from "../../components/sidebar/Sidebar";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { toast } from "react-toastify";
import {
  changePassword,
  logout,
  RESET,
} from "../../redux/features/auth/authSlice";
import "./ChangePassword.scss";
import { Spinner } from "../../components/loader/Loader";

const initialState = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const ChangePassword = () => {
  useRedirectLoggedOutUser("/login");
  const [formData, setFormData] = useState(initialState);

  const { oldPassword, newPassword, confirmPassword } = formData;

  const { isLoading, user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const updatePassword = async (e) => {
    e.preventDefault();

    if (!oldPassword || !newPassword || !confirmPassword) {
      return toast.error("All fields are required");
    }
    if (newPassword !== confirmPassword) {
      return toast.error("Password do not match");
    }

    const userData = {
      oldPassword,
      newPassword,
    };

    await dispatch(changePassword(userData));
    await dispatch(logout());
    await dispatch(RESET(userData));
    navigate("/login");
  };
  return (
    <>
      <div className="dashboard">
        <Sidebar />
        <div className="dashboard-content">
          <h1>Change Password</h1>
          <div className="--flex-start profile">
            <Card className={"card"}>
              <div>
                <form onSubmit={updatePassword}>
                  <p>
                    <label>Current Password:</label>
                    <PasswordInput
                      name="oldPassword"
                      value={oldPassword}
                      onChange={handleInputChange}
                      placeholder="Password"
                    />
                  </p>
                  <p>
                    <label>New Password:</label>
                    <PasswordInput
                      name="newPassword"
                      value={newPassword}
                      onChange={handleInputChange}
                      placeholder="Password"
                    />
                  </p>
                  <p>
                    <label>Confirm New Password:</label>
                    <PasswordInput
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm New Password"
                    />
                  </p>
                  {isLoading ? (
                    <Spinner />
                  ) : (
                    <button
                      type="submit"
                      className="--btn --btn-danger --btn-block --btn-lg"
                    >
                      Change Password
                    </button>
                  )}
                </form>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
