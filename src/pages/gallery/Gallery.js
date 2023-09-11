import React, { useEffect, useState } from "react";
import "./Gallery.css";
import GalleryComponent from "../../components/galleryComponent/GalleryComponent";
import Sidebar from "../../components/sidebar/Sidebar";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { FaPlus, FaPlusCircle } from "react-icons/fa";
import { AdminOnlyLink } from "../../components/protect/hiddenLink";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { createGalleryImage } from "../../redux/features/galleryImage/galleryImageSlice";

const Gallery = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [formImage, setFormImage] = useState(null);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  useRedirectLoggedOutUser("/login/?path=gallery");

  const handleGalleryFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', formImage);
    formData.append('id', user._id)
    dispatch(createGalleryImage(formData)).then(res=>{
      setFormImage(null);
      setOpenPopup(false);
    });

    // Close the popup
  };

  const ImageFormPopup = () => {
    return (
      <div className="galleryFormPopup">
        <div className="galleryFormPopup__content">
          <div className="galleryFormPopup__header">
            <h2>Add Image</h2>
            <span
              className="galleryFormPopup__closeBtn"
              onClick={() => setOpenPopup(false)}
            >
              <AiOutlineCloseCircle size={20} />
            </span>
          </div>
          <div className="galleryFormPopup__body">
            <form onSubmit={handleGalleryFormSubmit}>
              <div className="form-group">
                <label htmlFor="title">Image</label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  accept="image/*" 
                  required
                  onChange={(e)=> setFormImage(e.target.files[0])}
                />
              </div>
              <div className="form-group">
                <button className="form-button">Add Image</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };


  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <h1 className="--text-center">Welcome to our Gallery Page!</h1>
        <p className="--text-center --mb">
          Here you can find a collection of photos featuring our team members
          and some of our memorable meetings and events.
        </p>
        <div className="--flex-between top">
            <span>
              <h3>Gallery</h3>
            </span>
            <AdminOnlyLink>
              <span>
                <button
                  className="addBlogButton --btn-primary --btn-sm"
                  onClick={() => setOpenPopup(true)}
                >
                  <FaPlus size={20} color="white" id="addIcon" />
                </button>
              </span> 
            </AdminOnlyLink>
          </div>
        <GalleryComponent />
      </div>
      {openPopup && ImageFormPopup()}
    </div>
  );
};

export default Gallery;
