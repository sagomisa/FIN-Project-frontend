import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import profileImg from "../../assets/logo.png";
import Card from "../../components/card/Card";
import Loader from "../../components/loader/Loader";
import Sidebar from "../../components/sidebar/Sidebar";
import TabComponent from "../../components/tabs/TabComponent";
import { getUser } from "../../redux/features/auth/authSlice";
import "./Profile.scss";

const Profile = () => {
  const dispatch = useDispatch();

  const { isLoading, isLoggedIn, isSuccess, message, user } = useSelector(
    (state) => state.auth
  );

  const initialState = {
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    bio: user?.bio || "",
    photo: user?.photo || "",
    role: user?.role || "",
    isVerified: user?.isVerified || false,
  };
  const [profile, setProfile] = useState(initialState);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="dashboard">
        <Sidebar />
        <div className="dashboard-content">
          <h2 style={{color: "var(--color-dark)"}}>Profile</h2>
          <div className="--flex-start profile">
            <Card cardClass={"card"}>
              {!isLoading && user && (
                <>
                  <div className="profile-photo">
                    <div>
                      <img
                        src={imagePreview === null ? user?.photo : imagePreview}
                        alt="Profileimg"
                      />
                      <h3>Role: {profile.role}</h3>
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
                        value={profile?.name}
                        onChange={handleInputChange}
                      />
                    </p>
                    <p>
                      <label>Email:</label>
                      <input
                        type="email"
                        name="email"
                        value={profile?.email}
                        onChange={handleInputChange}
                        disabled
                      />
                    </p>
                    <p>
                      <label>Phone:</label>
                      <input
                        type="text"
                        name="phone"
                        value={profile?.phone}
                        onChange={handleInputChange}
                      />
                    </p>
                    <p>
                      <label>Bio:</label>
                      <textarea
                        name="bio"
                        value={profile?.bio}
                        onChange={handleInputChange}
                        cols="30"
                        rows="10"
                      ></textarea>
                    </p>
                    <button className="--btn --btn-primary --btn-block">
                      Update Profile
                    </button>
                  </form>
                </>
              )}
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
