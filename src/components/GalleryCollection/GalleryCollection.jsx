import { Component } from 'react';
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

class GalleryCollection extends Component {
  state = {
    status: statuses.IDLE,
    hits: [],
    loadMore: false,
  };

  static propTypes = {
    query: PropTypes.string.isRequired,
    onImageClick: PropTypes.func.isRequired,
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.query !== prevProps.query) {
      this.setState({ hits: [] });
      api.resetPage();
      this.loadPhotos();
      return;
    }
    if (prevState.loadMore && !this.state.loadMore) {
      toast.info("We're sorry, but you've reached the end of search results.");
    }
  }

  onLoadMore = () => {
    api.incrementPage();
    this.loadPhotos();
  };

  loadPhotos = async () => {
    api.query = this.props.query;
    if (api.query) {
      try {
        await this.setState({ status: statuses.PENDING });
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
          this.setState({ status: statuses.REJECTED });
          return;
        }

        const pages = Math.ceil(data.totalHits / api.totalPages);
        this.setState(prev => {
          return {
            ...prev,
            hits: [...prev.hits, ...imagesData],
            status: statuses.RESOLVED,
            loadMore: !!(api.page !== pages),
          };
        });
        if (api.page === 1) {
          toast.success(`Hooray! We found ${data.totalHits} images.`);
        }
      } catch (error) {
        this.setState({ status: statuses.REJECTED });
        toast.error('Something went wrong. Please try again');
      }
    }
  };

  render() {
    const { onLoadMore } = this;
    const { status, hits, loadMore } = this.state;
    const { onImageClick } = this.props;
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
}

export default GalleryCollection;
