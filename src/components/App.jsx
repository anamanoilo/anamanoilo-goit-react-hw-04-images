import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar';
import Modal from './Modal';
import GalleryCollection from './GalleryCollection/';

class App extends Component {
  state = { query: '', modalIsShown: false, title: '', src: '' };

  onSubmit = query => {
    this.setState({ query });
  };

  closeModal = () => {
    this.setState(prev => ({
      ...prev,
      modalIsShown: false,
      title: '',
      src: '',
    }));
  };

  onImageClick = e => {
    const modalSrc = e.target.dataset.src;
    const title = e.target.alt;
    this.setState(prev => ({
      ...prev,
      src: modalSrc,
      title,
      modalIsShown: true,
    }));
  };

  render() {
    const { onSubmit, closeModal, onImageClick } = this;
    const { query, src, title, modalIsShown } = this.state;
    return (
      <div className="App">
        <Searchbar onSubmit={onSubmit} />
        <GalleryCollection query={query} onImageClick={onImageClick} />
        {modalIsShown && (
          <Modal src={src} alt={title} closeModal={closeModal} />
        )}
        <ToastContainer
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    );
  }
}

export default App;
