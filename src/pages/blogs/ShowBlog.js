import React, { useEffect, useState } from "react";
import "./ShowBlog.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Spinner } from "../../components/loader/Loader";
import SampleImage from '../../assets/image1.jpeg';
import blogService from "../../redux/features/blog/blogService";


const ShowBlog = () => {
  const { id } = useParams();
  let dispatch = useDispatch();
  const [blogToDisplay, setBlogToDisplay] = useState(null);

  useEffect(() => {
    blogService.getBlogById(id).then((res)=>{
      setBlogToDisplay(res);
    })
  }, []);

  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString();
  };

  return <div>{!blogToDisplay ? <Spinner /> : 
  <>
    <div className="blog">
      <h2 className="blog-title">{blogToDisplay.title}</h2>
      <div className="blog-meta">
      <p className="blog-author"> {blogToDisplay.author.name}</p>
      <p className="blog-published-date">Published: {formatDate(blogToDisplay.createdAt)}</p>
      </div>
      {blogToDisplay.imageURL && <img className="blog-image" src={blogToDisplay.imageURL } alt={blogToDisplay.title} /> }
      <div className="blog-content">{blogToDisplay.content}</div>
    </div>
  </>}</div>;
};

export default ShowBlog;
