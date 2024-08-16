import css from './ImageCard.module.css';

export default function ImageCard({ image, handleOpenModal }) {
  return (
    <li className={css.card}>
      <img
        onClick={()=>handleOpenModal(image.urls.full)}
        src={image.urls.thumb}
        alt={image.alt_description}
        className={css.image}
      />
    </li>
  );
}