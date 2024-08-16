import css from './App.module.css';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { MagnifyingGlass } from 'react-loader-spinner';
import { getPhotos } from '../../api/unsplash';
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ImageModal from '../ImageModal/ImageModal';

export default function App() {
  const [query, setQuery] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [images, setImages] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [canLoadMore, setCanLoadMore] = useState(false);

  function onSearch(searchQuery) {
    if ('' === searchQuery) {
      toast.error('Enter search query');
      console.info('Empty search query entered');
      return;
    } else if (searchQuery.length < 3) {
      toast.error('Enter at least 3 characters');
      console.info('Search query too short');
      return;
    }

    setImages([]);
    setPage(1);
    setQuery(searchQuery);
  }

  function onLoadMore() {
    setCanLoadMore(false);
    setPage(prevPage => prevPage + 1);
  }

  function handleOpenModal(url) {
    setModalImage(url);
    setModalIsOpen(true);
  }

  function handleCloseModal() {
    setModalIsOpen(false);
    setModalImage(null);
  }

  useEffect(() => {
    if (null === query) return;

    setIsError(false);
    setIsLoading(true);

    getPhotos(query, page)
      .then(({ total_pages = 1, results = [] }) => {
        setCanLoadMore(total_pages > page);
        setImages(prevImages => [...prevImages, ...results]);
      })
      .catch(() => {
        setIsError(true);
        setImages([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [query, page]);

  return (
    <div className={css.wrapper}>
      <SearchBar onSearch={onSearch} />

      {isError && <h2>Something went wrong...</h2>}

      {images.length > 0 && <ImageGallery images={images} handleOpenModal={handleOpenModal} />}

      {isLoading && (
        <MagnifyingGlass
          visible={true}
          height='80'
          width='80'
          ariaLabel='magnifying-glass-loading'
          wrapperStyle={{ width: '100%', height: '200px' }}
          glassColor='#c0efff'
          color='rgb(0, 128, 192)'
        />
      )}

      {canLoadMore && !isError && <LoadMoreBtn onLoadMore={onLoadMore} />}

      {modalIsOpen && <ImageModal modalImage={modalImage} handleCloseModal={handleCloseModal} />}

      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </div>
  );
}
