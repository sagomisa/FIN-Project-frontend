import React, { useEffect, useState } from "react";
import Card from "../../components/card/Card";

import "./ChangePassword.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import PasswordInput from "../../components/passwordInput/PasswordInput";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import {
  changePassword,
  logout,
  RESET,
} from "../../redux/features/auth/authSlice";
import { Spinner } from "../../components/loader/Loader";
import { sendAutomatedEmail } from "../../redux/features/email/emailSlice";
import {
  checkChar,
  checkNumbers,
  checkUcaseLcase,
} from "../../redux/features/auth/authService";
import { FaTimes } from "react-icons/fa";
import { BsCheck2All } from "react-icons/bs";

const initialState = {
  oldPassword: "",
  password: "",
  password2: "",
};

const ChangePassword = () => {
  useRedirectLoggedOutUser("/login");
  const [formData, setFormData] = useState(initialState);
  const { oldPassword, password, password2 } = formData;

  const { isLoading, user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [upperCase, setUpperCase] = useState(false);
  const [num, setNum] = useState(false);
  const [specialChar, setSpecialChar] = useState(false);
  const [pwLength, setPwLength] = useState(false);

  const timesIcon = <FaTimes color="red" size={15} />;
  const checkIcon = <BsCheck2All color="green" size={15} />;

  const switchIcon = (condition) => {
    if (condition) {
      return checkIcon;
    }
    return timesIcon;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    //Check Lowercase and Uppercase
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
      setUpperCase(true);
    } else {
      setUpperCase(false);
    }

    // Check For Numbers
    if (password.match(/([0-9])/)) {
      setNum(true);
    } else {
      setNum(false);
    }

    // Check For Special char
    if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
      setSpecialChar(true);
    } else {
      setSpecialChar(false);
    }

    // Check For Password length
    if (password.length > 5) {
      setPwLength(true);
    } else {
      setPwLength(false);
    }
  }, [password]);

  const updatePassword = async (e) => {
    e.preventDefault();

    if (!oldPassword || !password || !password2) {
      return toast.error("All fields are required");
    }

    if (password !== password2) {
      return toast.error("Passwords do not match");
    }

    if (password.length < 6) {
      return toast.error("Password must be up to 6 characters");
    }

    if (!checkUcaseLcase(password)) {
      return toast.error(
        "Please add at least one uppercase and lowercase letter"
      );
    }
    if (!checkNumbers(password)) {
      return toast.error("Please add at least one number");
    }
    if (!checkChar(password)) {
      return toast.error("Please add at least one character");
    }

    const userData = {
      oldPassword,
      password,
    };

    const emailData = {
      subject: "Password Changed - Fin Investments Inc.",
      send_to: user.email,
      reply_to: "noreply@fininvestmentsinc",
      template: "changePassword",
      url: "/forgot",
    };

    await dispatch(changePassword(userData));
    await dispatch(sendAutomatedEmail(emailData));
    await dispatch(logout());
    await dispatch(RESET(userData));
    navigate("/login");
  };

  return (
    <>
      <div className="dashboard">
        <Sidebar />
        <div className="dashboard-content">
          <h2 className="--color-dark">Change Password</h2>
          <div className="--flex-start change-password">
            <Card cardClass={"card"}>
              <>
                <form onSubmit={updatePassword}>
                  <p>
                    <label>Current Password</label>
                    <PasswordInput
                      placeholder="Old Password"
                      name="oldPassword"
                      value={oldPassword}
                      onChange={handleInputChange}
                    />
                  </p>
                  <p>
                    <label>New Password:</label>
                    <PasswordInput
                      placeholder="Password"
                      name="password"
                      value={password}
                      onChange={handleInputChange}
                    />
                  </p>
                  <p>
                    <label>Confirm New Password:</label>
                    <PasswordInput
                      placeholder="Confirm Password"
                      name="password2"
                      value={password2}
                      onChange={handleInputChange}
                    />
                  </p>

                  {isLoading ? (
                    <Spinner />
                  ) : (
                    <button
                      type="submit"
                      className="--btn --btn-danger --btn-block"
                    >
                      Change Password
                    </button>
                  )}
                </form>
              </>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
