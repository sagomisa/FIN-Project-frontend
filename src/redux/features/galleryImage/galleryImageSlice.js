import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import galleryImageService from "./galleryImageService";

const initialState = {
  galleryImages: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const getAllGalleryImages = createAsyncThunk("galleryImage/getAllGalleryImages", async () => {
  const response = await galleryImageService.getAllGalleryImages();
  return response;
});

export const createGalleryImage = createAsyncThunk(
  "galleryImage/createGalleryImage",
  async (galleryImageData) => {
    const response = await galleryImageService.createGalleryImage(galleryImageData);
    return response;
  }
);

const galleryImageSlice = createSlice({
  name: "galleryImage",
  initialState,
  reducers: {
    resetGalleryImageState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
    },
  },
  extraReducers: {
    [getAllGalleryImages.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllGalleryImages.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.galleryImages = action.payload;
    },
    [getAllGalleryImages.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
      toast.error("Error fetching galleryImages");
    },
    [createGalleryImage.pending]: (state) => {
      state.isLoading = true;
    },
    [createGalleryImage.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.galleryImages.push(action.payload);
      toast.success("Gallery Image created successfully");
    },
    [createGalleryImage.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
      toast.error("Error creating galleryImage");
    },
  },
});

export default galleryImageSlice.reducer;

export const { resetGalleryImageState } = galleryImageSlice.actions;
