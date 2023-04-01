import React from "react";
import TopSection from "../../components/top_section/TopSection";

const UsefulLinks = () => {
  return (
    <div>
      <TopSection title="Useful Links" />
      <div
        className="container"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>Welcome to Useful Links Page!</h1>
        <h2 style={{ color: "var(--color-dark)" }}>
          This page is under construction!
        </h2>
      </div>
    </div>
  );
};

export default UsefulLinks;
