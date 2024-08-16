import css from './ImageModal.module.css';
import Modal from 'react-modal';

export default function ImageModal({ modalImage, handleCloseModal }) {
  return (
    <Modal
      className={css.Modal}
      isOpen={true}
      overlayClassName={css.Overlay}
      ariaHideApp={false}
      onRequestClose={handleCloseModal}
      contentLabel='Example Modal'
    >
      <img src={modalImage.urls.full} alt={modalImage.alt_description} className={css.modalImage} onClick={handleCloseModal} />
    </Modal>
  );
}
