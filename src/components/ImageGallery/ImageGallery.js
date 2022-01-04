import s from "./ImageGallery.module.css";
import React from "react";
import ImageGalleryItem from "./ImageGalleryItem/ImageGalleryItem";
import PropTypes from "prop-types";

const ImageGallery = ({ cards, onClick, imgData }) => {
  return (
    <ul className={s.gallery}>
      {cards.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          id={id}
          mini={webformatURL}
          max={largeImageURL}
          tags={tags}
          onClick={onClick}
          imgData={imgData}
        />
      ))}
    </ul>
  );
};
ImageGallery.propTypes = {
  cards: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  imgData: PropTypes.func.isRequired,
};
export default ImageGallery;
