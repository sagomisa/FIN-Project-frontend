import React, { useState } from "react";
import profileImg from "../../assets/logo.png";
import Card from "../../components/card/Card";
import PasswordInput from "../../components/passwordInput/PasswordInput";
import Sidebar from "../../components/sidebar/Sidebar";
import TabComponent from "../../components/tabs/TabComponent";
import "./ChangePassword.scss";

const initialState = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const ChangePassword = () => {
  const [formData, setFormData] = useState(initialState);

  const { oldPassword, newPassword, confirmPassword } = formData;

  const handleInputChange = () => {};
  return (
    <>
      <div className="dashboard">
        <Sidebar />
        <div className="dashboard-content">
          <h1>Change Password</h1>
          <div className="--flex-start profile">
            <Card className={"card"}>
              <div>
                <form>
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

                  <button className="--btn --btn-danger --btn-block --btn-lg">
                    Change Password
                  </button>
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
