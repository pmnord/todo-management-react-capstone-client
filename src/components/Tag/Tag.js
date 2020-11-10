import React from "react";
import "./Tag.css";

const Tag = (props) => {

  const handleDeleteTag = () => {
    props.deleteTag(props.index);
  };

  return (
    <span
      className={`tag ${props.color && `tag--${props.color}`}`}
      onClick={handleDeleteTag}
    >
      {props.title}
    </span>
  );
};

export default Tag;
