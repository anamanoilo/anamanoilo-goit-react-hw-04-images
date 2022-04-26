import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import ImageGallery from 'components/ImageGallery';
import Loader from 'components/Loader';
import Button from 'components/Button';
import api from 'services/Api';
// import { GALLERY_TYPES, galleryReducer } from 'services/GalleryReducer';

const statuses = {
  IDLE: 'idle',
  PENDING: 'pending',
  REJECTED: 'rejected',
  RESOLVED: 'resolved',
};

// const initialGalleryState = {
//   status: statuses.IDLE,
//   hits: [],
//   loadMore: false,
// };

function GalleryCollection({ onImageClick, query }) {
  // const [state, dispatch] = useReducer(galleryReducer, initialGalleryState);
  const [status, setStatus] = useState(statuses.IDLE);
  const [hits, setHits] = useState([]);
  const [loadMore, setLoadMore] = useState(false);

  const loadPhotos = async () => {
    api.query = query;
    if (api.query) {
      try {
        setStatus(statuses.PENDING);
        // dispatch({ type: GALLERY_TYPES.STATUS, payload: statuses.PENDING });
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
          // dispatch({ type: GALLERY_TYPES.STATUS, payload: statuses.REJECTED });
          return;
        }

        const pages = Math.ceil(data.totalHits / api.totalPages);

        setHits(api.page !== 1 ? [...hits, ...imagesData] : [...imagesData]);
        setStatus(statuses.RESOLVED);
        setLoadMore(api.page !== pages);
        // dispatch({
        //   type: GALLERY_TYPES.HITS,
        //   payload: {
        //     page: api.page,
        //     hits: state.hits,
        //     imagesData: imagesData,
        //   },
        // });
        // dispatch({ type: GALLERY_TYPES.STATUS, payload: statuses.RESOLVED });
        // dispatch({
        //   type: GALLERY_TYPES.LOAD_MORE,
        //   payload: api.page !== pages,
        // });

        if (api.page === 1) {
          toast.success(`Hooray! We found ${data.totalHits} images.`);
        }
      } catch (error) {
        // dispatch({ type: GALLERY_TYPES.STATUS, payload: statuses.REJECTED });

        setStatus(statuses.REJECTED);
        toast.error('Something went wrong. Please try again');
      }
    }
  };

  const onLoadMore = () => {
    api.incrementPage();
    loadPhotos();
  };

  useEffect(() => {
    if (query) {
      setHits([]);
      // dispatch({ type: GALLERY_TYPES.RESET, payload: [] });
      api.resetPage();
      loadPhotos();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

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
