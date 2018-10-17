import React, { PropTypes } from "react";

const Avatar = props => {
  const { source, altText, ...others } = props;

  return (
    <div className="avatar-w">
      <img
        {...others}
        alt={altText}
        src={source}
        className="avatar avatar-white"
      />
    </div>
  );
};

export default Avatar;
