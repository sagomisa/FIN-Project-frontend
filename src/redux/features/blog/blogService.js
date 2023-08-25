import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/blogs/`;

// Get all blogs
const getAllBlogs = async () => {
  const response = await axios.get(API_URL + "getAllBlogs");
  return response.data;
};

// Create a blog
const createBlog = async (blogData) => {
  const response = await axios.post(API_URL + "createBlog", blogData);
  return response.data;
};

// // Update blog
// const updateBlog = async (blogData) => {
//   const response = await axios.put(API_URL + "updateBlog", blogData);
//   return response.data;
// };

// Delete blog
const deleteBlog = async (id) => {
  const response = await axios.delete(API_URL + "deleteBlog/" + id);
  return response.data.message;
};

const getBlogById = async (id) => {
  const response = await axios.get(API_URL + "getBlogById/"+id);
  return response.data;
};

const blogService = {
  getAllBlogs,
  createBlog,
  deleteBlog,
  getBlogById
};

export default blogService;
