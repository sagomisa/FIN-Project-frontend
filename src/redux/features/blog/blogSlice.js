import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import blogService from "./blogService";

const initialState = {
  blogs: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const getAllBlogs = createAsyncThunk("blog/getAllBlogs", async () => {
  const response = await blogService.getAllBlogs();
  return response;
});

export const createBlog = createAsyncThunk(
  "blog/createBlog",
  async (blogData) => {
    const response = await blogService.createBlog(blogData);
    return response;
  }
);




// deleteBlog
export const deleteBlog = createAsyncThunk(
  "blog/deleteBlog",
  async (id, thunkAPI) => {
    try {
      return await blogService.deleteBlog(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    resetBlogState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
    },
  },
  extraReducers: {
    [getAllBlogs.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllBlogs.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.blogs = action.payload;
    },
    [getAllBlogs.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
      toast.error("Error fetching blogs");
    },
    [createBlog.pending]: (state) => {
      state.isLoading = true;
    },
    [createBlog.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.blogs.push(action.payload);
      toast.success("Blog created successfully");
    },
    [createBlog.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
      toast.error("Error creating blog");
    },

    //Delete blog
    [deleteBlog.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteBlog.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload;
      toast.success(action.payload);
    },
    [deleteBlog.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      toast.error(action.payload);
    }
  },
});

export default blogSlice.reducer;

export const { resetBlogState } = blogSlice.actions;
