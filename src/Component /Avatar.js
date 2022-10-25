import React from "react";

const Avatar = ({ url }) => {
  return (
    <div
      className="img-avatar"
      style={{ backgroundImage: `url(${url})` }}
    ></div>
  );
};

export default Avatar;
