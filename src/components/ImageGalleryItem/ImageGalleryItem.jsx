import PropTypes from 'prop-types';

function ImageGalleryItem({ title, url, onImageClick, modalUrl }) {
  return (
    <li className="ImageGalleryItem" onClick={onImageClick}>
      <img
        src={url}
        alt={title}
        data-src={modalUrl}
        className="ImageGalleryItem-image"
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  modalUrl: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
