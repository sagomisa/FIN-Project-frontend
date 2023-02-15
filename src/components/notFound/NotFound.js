import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  const navigation = useNavigate();
  // Redirect user to the home page when the user visits a page that does not exist in 2 seconds.
  useEffect(() => {
    setTimeout(() => {
      navigation("/");
    }, 2000);

    return () => {
      clearTimeout();
    };
  }, [navigation]);

  return (
    <div className="container">
      <div className="not-found">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>Redirecting to the home page...</p>
      </div>
    </div>
  );
};

export default NotFound;
