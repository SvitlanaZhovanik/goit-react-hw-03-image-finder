import s from "./ImageGalleryItem.module.css";
import React from "react";
import PropTypes from "prop-types";

const ImageGalleryItem = ({ id, mini, max, tags, onClick, imgData }) => {
  const handleClick = () => {
    imgData(max, tags);
    onClick();
  };
  return (
    <li className={s.item} id={id}>
      <img
        className={s.image}
        src={mini}
        alt={tags}
        loading="lazy"
        onClick={handleClick}
      />
    </li>
  );
};
ImageGalleryItem.propType = {
  id: PropTypes.string.isRequired,
  mini: PropTypes.string.isRequired,
  max: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  imgData: PropTypes.func.isRequired,
};
export default ImageGalleryItem;
