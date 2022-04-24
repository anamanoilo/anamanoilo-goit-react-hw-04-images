import { Component } from 'react';
import PropTypes from 'prop-types';

class Modal extends Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  };
  closeModalByEsc = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };
  closeByBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.closeModal();
    }
  };
  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModalByEsc);
  }
  componentDidMount() {
    window.addEventListener('keydown', this.closeModalByEsc);
  }
  render() {
    const { src, alt, closeModal } = this.props;
    return (
      <div className="Overlay" onClick={closeModal}>
        <div className="Modal">
          <img src={src} alt={alt} />
        </div>
      </div>
    );
  }
}

export default Modal;
