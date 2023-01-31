import React, { useState } from "react";
import profileImg from "../../assets/logo.png";
import Card from "../../components/card/Card";
import Sidebar from "../../components/sidebar/Sidebar";
import TabComponent from "../../components/tabs/TabComponent";
import "./Profile.scss";

const initialState = {
  name: "Nisha",
  email: "nisha@gmail.com",
  phone: "",
  bio: "",
  photo: "",
  role: "",
  isVerified: false,
};

const Profile = () => {
  const [profile, setProfile] = useState(initialState);
  const handleImageChange = () => {};
  const handleInputChange = () => {};
  return (
    <>
      <div className="dashboard">
        <Sidebar />

        <div className="dashboard-content">
          {/* <TabComponent /> */}
          <h1>Profile</h1>
          <div className="--flex-start profile">
            <Card className={"card"}>
              <div>
                <div className="profile-photo">
                  <div>
                    <img src={profileImg} alt="Profile Image" style={{}} />
                    <h3>Role: User</h3>
                  </div>
                </div>

                <form>
                  <p>
                    <label>Change Photo:</label>
                    <input
                      type="file"
                      accept="image/*"
                      name="image"
                      onChange={handleImageChange}
                    />
                  </p>
                  <p>
                    <label>Name:</label>
                    <input
                      type="text"
                      name="name"
                      value={profile.name}
                      onChange={handleInputChange}
                    />
                  </p>
                  <p>
                    <label>Email:</label>
                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleInputChange}
                      disabled
                    />
                  </p>
                  <p>
                    <label>Phone:</label>
                    <input
                      type="text"
                      name="phone"
                      value={profile.phone}
                      onChange={handleInputChange}
                    />
                  </p>
                  <p>
                    <label>Bio:</label>
                    <textarea
                      name="bio"
                      value={profile.bio}
                      onChange={handleInputChange}
                      cols="30"
                      rows="10"
                    ></textarea>
                  </p>
                  <button className="--btn --btn-primary --btn-block --btn-lg">
                    Update Profile
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

export default Profile;
