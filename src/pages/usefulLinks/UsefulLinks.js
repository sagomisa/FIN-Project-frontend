import React from "react";
import TopSection from "../../components/top_section/TopSection";
import "./UsefulLinks.css";

const UsefulLinks = () => {
  return (
    <div>
      <TopSection title="Useful Links" />
      <div className="usefulLinksContainer">
        <h1>Welcome to Useful Links Page!</h1>
        <p style={{ color: "var(--color-dark)" }}>
          Here are some useful links that you can use to view helpful
          information. We've added these resources to help you find the
          information you need. Simply click on the links below to access them:
        </p>
        <a
          href="https://www.theglobeandmail.com/?fbclid=IwAR3yqFeLI3GU3xurFRjIYuyAr__aUYUy913vSfkpcQUGYQdk9NGqdJ1whFU"
          target="_blank"
        >
          https://www.theglobeandmail.com/?fbclid=IwAR3yqFeLI3GU3xurFRjIYuyAr__aUYUy913vSfkpcQUGYQdk9NGqdJ1whFU
        </a>
      </div>
    </div>
  );
};

export default UsefulLinks;
