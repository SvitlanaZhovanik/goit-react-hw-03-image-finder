import s from "./ImageGalleryItem.module.css";

const ImageGalleryItem = ({ id, mini, max, tags }) => {
  return (
    <li className={s.item}>
      <img className={s.image} src={mini} alt={tags} />
    </li>
  );
};
export default ImageGalleryItem;
