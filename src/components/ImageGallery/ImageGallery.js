import s from "./ImageGallery.module.css";
import React from "react";
import ImageGalleryItem from "./ImageGalleryItem/ImageGalleryItem";

const ImageGallery = ({ cards }) => {
  return (
    <ul className={s.gallery}>
      {cards.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          id={id}
          mini={webformatURL}
          max={largeImageURL}
          tags={tags}
        />
      ))}
    </ul>
  );
};
export default ImageGallery;
