import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import ImageGallery from 'components/ImageGallery';
import Loader from 'components/Loader';
import Button from 'components/Button';
import api from 'services/Api';

const statuses = {
  IDLE: 'idle',
  PENDING: 'pending',
  REJECTED: 'rejected',
  RESOLVED: 'resolved',
};

function GalleryCollection({ onImageClick, query }) {
  const [status, setStatus] = useState(statuses.IDLE);
  const [hits, setHits] = useState([]);
  const [loadMore, setLoadMore] = useState(false);

  const loadPhotos = useCallback(async () => {
    api.query = query;
    if (api.query) {
      try {
        setStatus(statuses.PENDING);
        const data = await api.fetchPhotos();
        const imagesData = data.hits.map(
          ({ webformatURL, id, tags, largeImageURL }) => ({
            webformatURL,
            id,
            tags,
            largeImageURL,
          })
        );
        if (!data.hits.length) {
          toast.error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          setStatus(statuses.REJECTED);
          return;
        }

        const pages = Math.ceil(data.totalHits / api.totalPages);

        setHits(prev =>
          api.page !== 1 ? [...prev, ...imagesData] : imagesData
        );
        setStatus(statuses.RESOLVED);
        setLoadMore(api.page !== pages);

        if (api.page === 1) {
          toast.success(`Hooray! We found ${data.totalHits} images.`);
        }
      } catch (error) {
        setStatus(statuses.REJECTED);
        toast.error('Something went wrong. Please try again');
      }
    }
  }, [query]);

  const onLoadMore = () => {
    api.incrementPage();
    loadPhotos();
  };

  useEffect(() => {
    loadPhotos();
  }, [loadPhotos]);

  useEffect(() => {
    if (api.page !== 1) {
      toast.info("We're sorry, but you've reached the end of search results.");
    }
  }, [loadMore]);

  if (status === 'idle') {
    return <div></div>;
  }
  if (status === 'pending') {
    return (
      <>
        <ImageGallery hits={hits} onImageClick={onImageClick} />
        <Loader />
      </>
    );
  }

  if (status === 'rejected') {
    return <div></div>;
  }
  if (status === 'resolved') {
    return (
      <>
        <ImageGallery hits={hits} onImageClick={onImageClick} />
        {loadMore ? <Button onClick={onLoadMore} /> : null}
      </>
    );
  }
}

GalleryCollection.propTypes = {
  query: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default GalleryCollection;
