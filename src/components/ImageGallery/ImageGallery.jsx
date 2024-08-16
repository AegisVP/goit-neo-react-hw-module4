import css from './ImageGallery.module.css';
import ImageCard from '../ImageCard/ImageCard';

export default function ImageGallery({ handleOpenModal, images = [] }) {
  return (
    <ul className={css.gallery}>
      {images.map(image => (
        <ImageCard key={image.id} image={image} handleOpenModal={handleOpenModal} />
      ))}
    </ul>
  );
}
