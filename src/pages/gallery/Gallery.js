import React from "react";
import GalleryComponent from "../../components/galleryComponent/GalleryComponent";
import Sidebar from "../../components/sidebar/Sidebar";

const Gallery = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <h1 className="--text-center">Welcome to our Gallery Page!</h1>
        <p className="--text-center --mb">
          Here you can find a collection of photos featuring our team members
          and some of our memorable meetings and events.
        </p>
        <GalleryComponent />
      </div>
    </div>
  );
};

export default Gallery;
