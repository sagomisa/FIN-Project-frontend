import React, { useEffect, useState } from "react";
import "./Blogs.css";
import Sidebar from "../../components/sidebar/Sidebar";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FaPlus, FaPlusCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllBlogs,
  createBlog,
} from "../../redux/features/blog/blogSlice";
import EventCard from "../../components/eventCard/EventCard";
import moment from "moment-timezone";
import { AdminOnlyLink } from "../../components/protect/hiddenLink";
import ScrollToTop from "../../components/scrollToTop/ScrollToTop";
import BlogCard from "../../components/blogCard/BlogCard";

const blogFormState = {
  title: "",
  content: ""
};

const Blogs = () => {
  useRedirectLoggedOutUser("/login/?path=blogs");

  const [openPopup, setOpenPopup] = useState(false);
  const { blogs } = useSelector((state) => state.blog);
  const { user } = useSelector((state) => state.auth);
  const [blogForm, setBlogForm] = useState(blogFormState);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBlogs());
  }, [dispatch]);



  const handleBlogFormChange = (e) => {
    setBlogForm({
      ...blogForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleBlogFormSubmit = (e) => {
    e.preventDefault();

    dispatch(createBlog({id: user._id, ...blogForm})).then(res=>{
      console.warn(res)
    });

    // Close the popup
    setOpenPopup(false);
  };

  useEffect(() => {
    // Reset the form
    setBlogForm(blogFormState);
  }, [openPopup]);

  const blogFormPopup = () => {
    return (
      <div className="blogFormPopup">
        <div className="blogFormPopup__content">
          <div className="blogFormPopup__header">
            <h2>Add Blog</h2>
            <span
              className="blogFormPopup__closeBtn"
              onClick={() => setOpenPopup(false)}
            >
              <AiOutlineCloseCircle size={20} />
            </span>
          </div>
          <div className="blogFormPopup__body">
            <form onSubmit={handleBlogFormSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={blogForm.title}
                  onChange={handleBlogFormChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="content">Content</label>
                <textarea
                  name="content"
                  id="content"
                  cols="30"
                  rows="10"
                  value={blogForm.content}
                  onChange={handleBlogFormChange}
                ></textarea>
              </div>
              <div className="form-group">
                <button className="form-button">Add Blog</button>
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
      <ScrollToTop />
      <div className="dashboard-content">
        <div className="blogsContainer">
          <div className="--flex-between top">
            <span>
              <h3>Blogs</h3>
            </span>
            <AdminOnlyLink>
              <span className="addBlogBtn">
                <button
                  className="addBlogButton --btn-primary --btn-sm"
                  onClick={() => setOpenPopup(true)}
                >
                  <FaPlus size={20} color="white" id="addIcon" />
                </button>
              </span> 
            </AdminOnlyLink>
          </div>

          <div className="past-blogss">
            <h2>Published Blogs</h2>
            {blogs.length === 0 && <p>No blogs published!</p>}
            {blogs.map((blog) => {
              return <BlogCard blog={blog} key={blog._id} />;
            })}
          </div>

         
          {openPopup && blogFormPopup()}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
