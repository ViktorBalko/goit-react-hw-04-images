import React, { useState, useEffect } from 'react';
import Searchbar from './SearchBar/SearchBar';
import Gallery from './Gallery';
import MoreButton from 'components/MoreButton';
import fetchImages from 'components/FetchData';
import Modal from './Modal';
import Loader from 'components/Loader/Loader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function App() {
  const [request, setRequest] = useState('');
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [totalHits, setTotalHits] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentImage, setCurrentImage] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (request === '') {
      return;
    }
    setLoading(true);

    fetchImages(request, currentPage)
      .then(response => {
        if (response.hits.length === 0) {
          throw new Error('No photos found');
        }
        setResponse(prevResponse => [...prevResponse, ...response.hits]);
        setTotalHits(response.totalHits);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [request, currentPage]);

  const handleFormSubmit = query => {
    setRequest(query);
    setResponse([]);
    setCurrentPage(1);
  };

  const hanleLoadMore = () => {
    setCurrentPage(prevState => prevState + 1);
  };

  const handleOpenModal = img => {
    setCurrentImage(img);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setCurrentImage('');
    setShowModal(false);
  };

  const totalPage = response.length / totalHits;

  return (
    <>
      <div>
        <Searchbar onSubmit={handleFormSubmit} />
        {loading && <Loader />}
        {response.length !== 0 && (
          <Gallery response={response} onOpenModal={handleOpenModal} />
        )}
        {showModal && (
          <Modal onClose={handleCloseModal} currentImage={currentImage} />
        )}
        {totalPage < 1 && !loading && <MoreButton onLoadMore={hanleLoadMore} />}
        {error && <h1>{error}</h1>}
        <ToastContainer
          position="top-left"
          autoClose={1300}
          theme="colorized"
        />
      </div>
    </>
  );
}

export default App;
