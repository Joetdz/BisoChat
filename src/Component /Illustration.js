import React from "react";

const Illustration = ({ image }) => {
  return (
    <div
      className="illustration"
      style={{ backgroundImage: `url(${image})` }}
    ></div>
  );
};

export default Illustration;
