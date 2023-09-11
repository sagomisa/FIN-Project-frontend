import React, { useEffect, useRef, useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import {
  getAllGalleryImages
} from "../../redux/features/galleryImage/galleryImageSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../loader/Loader";

const GalleryComponent = () => {
  const { galleryImages, isLoading } = useSelector((state) => state.galleryImage);

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getAllGalleryImages());
  }, [dispatch]);

  const formatImages = () => {
    return galleryImages.map((galleryImage) => ({
      original: galleryImage.imageURL,
      thumbnail: galleryImage.imageURL,
    }));
  };

  return (
    <div>
      {console.log(galleryImages)}
      {isLoading ? (
        <Loader />
      ) : galleryImages.length > 0 ? (
        <ImageGallery items={formatImages()} />
      ) : (
        <h3>No images to display</h3>
      )}
    </div>
  );
};

export default GalleryComponent;
