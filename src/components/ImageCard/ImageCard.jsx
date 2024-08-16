import css from './ImageCard.module.css';

export default function ImageCard({ image, handleOpenModal }) {
  return (
    <li className={css.card}>
      <img
        onClick={()=>handleOpenModal(image)}
        src={image.urls.small}
        alt={image.alt_description}
        className={css.image}
      />
    </li>
  );
}