import React from "react";
import "./BlogCard.css";
import { AiFillCalendar, AiOutlineFieldTime } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import {
  deleteBlog,
  getAllBlogs,
} from "../../redux/features/blog/blogSlice";
import { confirmAlert } from "react-confirm-alert";
import { useDispatch } from "react-redux";
import { AdminOnlyLink } from "../protect/hiddenLink";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const dispatch = useDispatch();

  const removeBlog = async (id) => {
    console.log(`id3>>>>>>${id}`);
    await dispatch(deleteBlog(id));
    await dispatch(getAllBlogs());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete This Blog",
      message: "Are you sure to do delete this blog?",
      buttons: [
        {
          label: "Delete",
          onClick: () => {
            removeBlog(id);
          },
        },
        {
          label: "Cancel",
          onClick: () => alert("Click No"),
        },
      ],
    });
  };

  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString();
  };


  return (
    <div className="blogsCard">
      <div className="blog">
        <div className="--flex-between">
          <span>
            <h2>{blog.title}</h2>
          </span>
          <AdminOnlyLink>
            <span>
              <FaTrashAlt
                size={20}
                color="red"
                onClick={() => confirmDelete(blog._id)}
              />
            </span>
          </AdminOnlyLink>
        </div>
        <div id="date-time">
          <div>
            <AiFillCalendar size={20} />
            <p>{formatDate(blog.createdAt)}</p>
          </div>
          </div>
        <div >
          <p className="content">{blog.content}</p>
        </div>
      <Link  to={`/blog/${blog._id}`} className="blog-link">
        <p>Show more</p>
      </Link>
      </div>
    </div>
  );
};

export default BlogCard;
