import React, { useRef } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const GalleryComponent = () => {
  const images = [
    {
      original: require("../../assets/image1.jpeg"),
      thumbnail: require("../../assets/image1.jpeg"),
    },
    {
      original: require("../../assets/image2.jpeg"),
      thumbnail: require("../../assets/image2.jpeg"),
    },
    {
      original: require("../../assets/image3.jpeg"),
      thumbnail: require("../../assets/image3.jpeg"),
    },
    {
      original: require("../../assets/image4.jpeg"),
      thumbnail: require("../../assets/image4.jpeg"),
    },
    {
      original: require("../../assets/image5.jpg"),
      thumbnail: require("../../assets/image5.jpg"),
    },
    {
      original: require("../../assets/image6.jpg"),
      thumbnail: require("../../assets/image6.jpg"),
    },
  ];

  return (
    <div>
      <ImageGallery items={images} />
    </div>
  );
};

export default GalleryComponent;
