import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/galleryImages/`;

// Get all galleryImages
const getAllGalleryImages = async () => {
  const response = await axios.get(API_URL + "getAllGalleryImages");
  return response.data;
};

// Create a galleryImage
const createGalleryImage = async (galleryImageData) => {
  const response = await axios.post(API_URL + "createGalleryImage", galleryImageData);
  return response.data;
};




const galleryImageService = {
  getAllGalleryImages,
  createGalleryImage
};

export default galleryImageService;
